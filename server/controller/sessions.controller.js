import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router(); 

const addSession = ("/add", authenticateToken, async (req, res) => {
    const { subject, start_time, end_time, reminders } = req.body;
    const userId = req.user.userId;

    if (!subject || !start_time || !end_time || reminders === undefined) {
        return res.status(400).send("Missing entries");
    }
 
    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .input("subject", sql.VarChar, subject)
            .input("start_time", sql.DateTime, start_time)
            .input("end_time", sql.DateTime, end_time)
            .input("status", sql.VarChar, "scheduled") // Set initial status to "scheduled"
            .input("reminders", sql.Bit, reminders)
            .input("date_created", sql.DateTime, new Date())
            .query("INSERT INTO sessions (user_id, subject, start_time, end_time, reminders, status, date_created) VALUES (@userId, @subject, @start_time, @end_time, @reminders, @status, @date_created)");

        res.status(201).json({message: "Session created successfully."});

    } catch(err) { 
        res.status(500);
        res.send(err.message); 
    }
});

const getSession = ("/get", async (req, res) => {
    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .query("SELECT * FROM sessions WHERE is_active = 1");

        if(result.recordset.length === 0) {
            return res.status(404).send("No sessions found.");
        }

        res.status(200).json(result.recordset);

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

const getSessionById = ("/get/:id", async (req, res) => {
    const id = req.params.id;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM sessions WHERE id = @id AND is_active = 1");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("Session not found.");
        }

        res.status(200).json(result.recordset[0]);

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
}); 

const getUserSession = ("/user", authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query("SELECT * FROM sessions WHERE user_id = @userId AND is_active = 1");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("No tasks found.");
        }

        res.status(200).json(result.recordset);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

const deleteSession = ("/delete/:id", authenticateToken, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.userId;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("id", sql.Int, id)
            .input("userId", sql.Int, userId)
            .query("UPDATE sessions SET is_active = 0 WHERE id = @id AND user_id = @userId");
        
        if(result.rowsAffected[0] === 0) {
            return res.status(404).send("Task not found.");
        }

        res.status(200).json({message: "Task deleted successfully."});

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

const getUpcomingSession = ("/upcoming", authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .query("SELECT TOP 1 * FROM sessions WHERE user_id = @userId AND is_active = 1 AND start_time > GETDATE() ORDER BY start_time ASC");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("No upcoming sessions found.");
        }

        res.status(200).json(result.recordset[0]);
    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
}); 

const getSessionSummary = async (req, res) => {
  const { sessionId } = req.params;
  const userId = req.user.userId;

  try {
    let pool = await sql.connect(config);

    const sessionResult = await pool.request()
      .input("sessionId", sql.Int, sessionId)
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM sessions WHERE id = @sessionId AND user_id = @userId AND is_active = 1");

    if (sessionResult.recordset.length === 0) {
      return res.status(404).send("Session not found.");
    }

    const tasksResult = await pool.request()
      .input("sessionId", sql.Int, sessionId)
      .query("SELECT * FROM tasks WHERE session_id = @sessionId AND user_id = @userId AND completed = 1");

    const sessionSummary = {
      session: sessionResult.recordset[0],
      completedTasks: tasksResult.recordset.length,
      tasks: tasksResult.recordset
    };

    res.status(200).json(sessionSummary);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const updateSession = async (req, res) => {
  const { id } = req.params;
  const { subject, start_time, end_time, reminders } = req.body;
  const userId = req.user.userId;

  if (!subject || !start_time || !end_time || reminders === undefined) {
    return res.status(400).send("Missing entries");
  }

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .input("subject", sql.VarChar, subject)
      .input("start_time", sql.DateTime, start_time)
      .input("end_time", sql.DateTime, end_time)
      .input("status", sql.VarChar, "scheduled") // Set status to "scheduled"
      .input("reminders", sql.Bit, reminders)
      .query("UPDATE sessions SET subject = @subject, start_time = @start_time, end_time = @end_time, status = @status, reminders = @reminders WHERE id = @id AND user_id = @userId");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Session not found.");
    }

    res.status(200).json({ message: "Session updated successfully." });

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

export default { 
  addSession, 
  getSession, 
  getSessionById, 
  getUserSession, 
  deleteSession, 
  getUpcomingSession, 
  getSessionSummary, 
  updateSession 
};