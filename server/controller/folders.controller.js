import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

const createFolder = ("/create", authenticateToken, async (req, res) => {
  const { name } = req.body;
  const userId = req.user.userId;

  if (!name) {
    return res.status(400).send("Folder name is required.");
  }

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("userId", sql.Int, userId)
      .input("name", sql.VarChar, name)
      .input("date_created", sql.DateTime, new Date())
      .query("INSERT INTO folders (user_id, name, date_created) VALUES (@userId, @name, @date_created)");

    res.status(201).json({ message: "Folder created successfully." });

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

const getFolders = ("/", authenticateToken, async (req, res) => {
  const userId = req.user.userId;

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM folders WHERE user_id = @userId AND is_active = 1");

    if (result.recordset.length === 0) {
      return res.status(404).send("No folders found.");
    }

    res.status(200).json(result.recordset);

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

const deleteFolder = ("/delete/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("userId", sql.Int, userId)
      .query("UPDATE folders SET is_active = 0 WHERE id = @id AND user_id = @userId");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Folder not found.");
    }

    res.status(200).json({ message: "Folder deleted successfully." });

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

const uploadFile = ("/:id/upload", authenticateToken, async (req, res) => {
  const folderId = req.params.id;
  const { fileName, fileContent } = req.body;
  const userId = req.user.userId;

  if (!fileName || !fileContent) {
    return res.status(400).send("File name and content are required.");
  }

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("folderId", sql.Int, folderId)
      .input("userId", sql.Int, userId)
      .input("fileName", sql.VarChar, fileName)
      .input("fileContent", sql.VarChar, fileContent)
      .input("date_uploaded", sql.DateTime, new Date())
      .query("INSERT INTO files (folder_id, user_id, name, content, date_uploaded) VALUES (@folderId, @userId, @fileName, @fileContent, @date_uploaded)");

    res.status(201).json({ message: "File uploaded successfully." });

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

const getFilesInFolder = ("/:id/files", authenticateToken, async (req, res) => {
  const folderId = req.params.id;
  const userId = req.user.userId;

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("folderId", sql.Int, folderId)
      .input("userId", sql.Int, userId)
      .query("SELECT * FROM files WHERE folder_id = @folderId AND user_id = @userId AND is_active = 1");

    if (result.recordset.length === 0) {
      return res.status(404).send("No files found in this folder.");
    }

    res.status(200).json(result.recordset);

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

const deleteFile = ("/:folderId/files/:fileId", authenticateToken, async (req, res) => {
  const folderId = req.params.folderId;
  const fileId = req.params.fileId;
  const userId = req.user.userId;

  try {
    let pool = await sql.connect(config);

    const result = await pool.request()
      .input("folderId", sql.Int, folderId)
      .input("fileId", sql.Int, fileId)
      .input("userId", sql.Int, userId)
      .query("UPDATE files SET is_active = 0 WHERE id = @fileId AND folder_id = @folderId AND user_id = @userId");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("File not found.");
    }

    res.status(200).json({ message: "File deleted successfully." });

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

export default { createFolder, getFolders, deleteFolder, uploadFile, getFilesInFolder, deleteFile };
