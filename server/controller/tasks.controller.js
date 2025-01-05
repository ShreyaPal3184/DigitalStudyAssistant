import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const addTask = ("/add", authenticateToken, async (req, res) => {
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

const getTask = ("/get", async (req, res) => { 
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

const getTaskById = ("/get/:id", async (req, res) => {
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

//get tasks by user id
const getUserTask = ("/user", authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query("SELECT * FROM tasks WHERE user_id = @userId");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("No tasks found.");
        }

        res.status(200).json(result.recordset);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

const deleteTask = ("/delete/:id", authenticateToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("ALTER TABLE tasks SET is_active = 0 WHERE id = @id AND user_id = @userId");
        
        if(result.rowsAffected[0] === 0) {
            return res.status(404).send("Task not found.");
        }

        res.status(200).json({message: "Task deleted successfully."});

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

const updateTask = ( "/update/:id", authenticateToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;
    const { title, description, due_date, priority, completed } = req.body;

    if (!title || !description || !due_date || !priority || completed === undefined) {
        return res.status(400).send("Missing entries");
    }

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("userId", sql.Int, userId)
            .input("title", sql.VarChar, title)
            .input("description", sql.VarChar, description)
            .input("due_date", sql.Date, due_date)
            .input("priority", sql.VarChar, priority)
            .input("completed", sql.Bit, completed)
            .query("UPDATE tasks SET title = @title, description = @description, due_date = @due_date, priority = @priority, completed = @completed WHERE id = @id AND user_id = @userId");
        
        if(result.rowsAffected[0] === 0) {
            return res.status(404).send("Task not found.");
        }

        res.status(200).json({message: "Task updated successfully."});

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

export default { addTask, getTask, getTaskById, getUserTask, deleteTask, updateTask };