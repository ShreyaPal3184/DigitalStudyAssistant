import express from "express";
import sql from "mssql";
import db from "./db.js";

const router = express.Router();

router.post("/user", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Name, email, and password are required.");
    }
    
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        let pool = await sql.connect(db);

        const result = await pool.request()
            .input("name", sql.VarChar, req.body.name)
            .input("email", sql.VarChar, req.body.email)
            .input("password", sql.VarChar, req.body.hashedPassword)
            .query("INSERT INTO users (name, email) VALUES (@name, @email)");

        res.status(201).json({message: "User created successfully."});

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});


module.exports = router;