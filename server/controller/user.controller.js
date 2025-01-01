import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "./config.js";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

const register = ("/register", async (req, res) => {
    const { username, email, password, confirmPassword, notifications } = req.body;

    console.log(username, email, password, confirmPassword, notifications);

    if (!username || !email || !password || !confirmPassword || notifications === undefined) {
        return res.status(400).send("Missing entries");
    }

    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match.");
    } else {
    
        try {
            let pool = await sql.connect(config);

            const checkUser = await pool.request() 
                .input("email", sql.VarChar, req.body.email)
                .input("username", sql.VarChar, req.body.username)
                .query("SELECT * FROM users WHERE email = @email OR username = @username");

            if(checkUser.recordset.length > 0) {
                return res.status(400).send("User already exists");
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const result = await pool.request()
                .input("username", sql.VarChar, req.body.username)
                .input("email", sql.VarChar, req.body.email)
                .input("password", sql.VarChar, hashedPassword)
                .input("notifications", sql.Bit, req.body.notifications)
                .query("INSERT INTO users (username, email, password, notifications) VALUES (@username, @email, @password, @notifications)");

            res.status(201).json({message: "User created successfully."});

        } catch (err) {
            res.status(500);
            res.send(err.message);
        }
    }
});

const login = ("/login", async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(401).send("Missing entries.");
    }    

    //console.log(email, password);
    

    try {
        let pool = await sql.connect(config);
        
        const result = await pool.request()
            .input("email", sql.VarChar, email)
            .query("SELECT * FROM users WHERE email = @email");
        
        if (result.recordset.length === 0) {
            return res.status(401).send("User not found.");
        } 

        const user = result.recordset[0];
        const validPassword = await bcrypt.compare(password, user.password);
    
        if (!validPassword) {
            return res.status(401).send("Unauthorized access.");
        }

        const tokenData = {
            userId: user.id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'});
        //console.log(token);
        
        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpOnly: true, samSite: 'strict'}).json({
            message: 'Login successful',
            success: true,
            token: token,
            username: user.username,
        })
        
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

const getUsers = ("/get", async (req, res) => {
    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .query("SELECT * FROM users");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("No users found.");
        }            
        res.json(result.recordset);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

const getUserById = ("/get/:id", async (req, res) => {
    const { id } = req.params;

    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .query("SELECT * FROM users WHERE id = @id");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("User not found.");
        }            
        res.json(result.recordset);
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

const updateUser = ("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { username, email, password, notifications } = req.body;

    if (!username || !email || !password || notifications === undefined) {
        return res.status(400).send("Missing entries");
    }


    try {
        let pool = await sql.connect(config);
        const result = await pool.request()
            .input("id", sql.Int, req.params.id)
            .input("username", sql.VarChar, req.body.username)
            .input("email", sql.VarChar, req.body.email)
            .input("password", sql.VarChar, req.body.password)
            .input("notifications", sql.Bit, req.body.notifications)
            .query("UPDATE users SET username = @username, email = @email, password = @password, notifications = @notifications WHERE id = @id");
        
        if(result.rowsAffected[0] === 0) {
            return res.status(404).send("User not found.");
        }            
        res.json({message: "User updated successfully."});
    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

export default { register, login, getUsers, getUserById, updateUser };