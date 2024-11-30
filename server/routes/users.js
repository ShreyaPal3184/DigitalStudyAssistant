import express from "express";
import sql from "mssql";
import bcrypt from "bcrypt";
import config from "./config.js";

const router = express.Router();

router.post("/user", async (req, res) => {
    const { username, email, password, notifications } = req.body;

    if (!username || !email || !password || !notifications) {
        return res.status(400).send("Name, email, and password are required.");
    }
    
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let pool = await sql.connect(config);

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
});


export default router;