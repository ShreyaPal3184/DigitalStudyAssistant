import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const addFriendship = ("/add", authenticateToken, async (req, res) => {
    const { friendId } = req.body;
    const userId = req.user.userId;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request() 
            .input("userId", sql.Int, userId)
            .input("friendId", sql.Int, friendId)
            .input("status", sql.Int, 0) //status: -1:not friend, 0:pending, 1:friend
            .query("INSERT INTO friendships (userId, friendId, status) VALUES (@userId, @friendId, @status)");
        
        res.status(200).send("Friend request sent.");
    } catch(err) {
        res.send(err);
        console.log(err);        
    }
});

const acceptFriendship = ("/accept", authenticateToken, async (req, res) => {
    const friendId = req.body.friendId;
    const userId = req.user.userId;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .input("friendId", sql.Int, friendId)
            .input("status", sql.Int, 1)
            .query("UPDATE friendships SET status = @status WHERE userId = @friendId AND friendId = @userId");

        res.status(200).send("Friend request accepted.");
    } catch(err) {
        res.send(err);
        console.log(err);
    }
});

const rejectFriendship = ("/reject", authenticateToken, async (req, res) => {
    const friendId = req.body.friendId;
    const userId = req.user.userId;

    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input("userId", sql.Int, userId)
            .input("friendId", sql.Int, friendId)
            .input("status", sql.Int, -1)
            .query("UPDATE friendships SET status = @status WHERE userId = @friendId AND friendId = @userId");

        res.status(200).send("Friend request rejected.");
    } catch(err) {
        res.send(err);
        console.log(err);
    }
});

export default { addFriendship, acceptFriendship };