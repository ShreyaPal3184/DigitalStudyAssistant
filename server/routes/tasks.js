import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authenticateToken, async (req, res) => {
    const { title, description, due_date, priority, completed } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !due_date || !priority || completed === undefined) {
        return res.status(400).send("Missing entries");
    }

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .input("title", sql.VarChar, title)
            .input("description", sql.VarChar, description)
            .input("due_date", sql.Date, due_date)
            .input("priority", sql.VarChar, priority)
            .input("completed", sql.Bit, completed)
            .query("INSERT INTO tasks (user_id, title, description, due_date, priority, completed) VALUES (@userId, @title, @description, @due_date, @priority, @completed)");

        res.status(201).json({message: "Task created successfully."});

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

router.get("/get", async (req, res) => { 
    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .query("SELECT * FROM tasks");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("No tasks found.");
        }

        res.status(200).json(result.recordset);

    } catch (err) {
        res.status(500);
        res.send(err.message);
    }
});

router.get("/get/:id", async (req, res) => {
    const id = req.params.id;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM tasks WHERE id = @id");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("Task not found.");
        }

        res.status(200).json(result.recordset[0]);

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
}); 



export default router;