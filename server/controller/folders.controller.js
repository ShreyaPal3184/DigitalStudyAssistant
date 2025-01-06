import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);


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
      .input("created_at", sql.DateTime, new Date())
      .input("is_active", sql.Bit, 1)
      .query("INSERT INTO folders (user_id, name, created_at, is_active) VALUES (@userId, @name, @created_at, 1)");

    res.status(201).json({ message: "Folder created successfully." });

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

const getFolders = ("/get", authenticateToken, async (req, res) => {
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

const deleteFolder = ("/delete-folder/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const userId = req.user.userId;

  try {
    let pool = await sql.connect(config);

    const fileResult = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT name FROM files WHERE folder_id = @id');

    const files = fileResult.recordset;

    if (files.length === 0) {
      return res.status(404).send({ message: `No files found for folder ID ${folderId}.` });
    }

    for (const file of files) {
      if (file.name) { // Ensure file.name exists
        const blobClient = containerClient.getBlockBlobClient(file.name);

        // Delete the blob
        await blobClient.deleteIfExists();
        console.log(`Deleted blob: ${file.name}`);
      } else {
        console.warn(`File name is missing for one of the files in folder ID ${id}.`);
      }
    }

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

const uploadFile = ('/upload-file/:id', authenticateToken, async (req, res) => {
  const file = req.file;
  const folderId = req.params.id;
  const userId = req.user.userId;
  
  console.log(req.file);
  console.log(req.body);    
      

  if(!req.file) {
      return res.status(400).send("No file uploaded");
  }

  try {
      const blobName = `${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const uploadBlobResponse = await blockBlobClient.uploadData(req.file.buffer, {
          blobHTTPHeaders: {
            blobContentType: req.file.mimetype, // Set correct MIME type
          },
        });
      
      blockBlobClient.upload(req.file.buffer, req.file.size);

      const fileUrl = blockBlobClient.url;
      const fileName = blockBlobClient.name
      

      const pool = await sql.connect(config);
      const result = await pool.request()
          .input("userId", sql.Int, userId)
          .input("folderId", sql.Int, folderId)
          .input("fileName", sql.VarChar, fileName)
          .input("fileUrl", sql.VarChar, fileUrl)
          .query("INSERT INTO files (user_id, folder_id, name, url) VALUES (@userId, @folderId, @fileName, @fileUrl)");
      
      res.status(200).send("File uploaded successfully");
  } catch (error) {
      console.log("Error uploading file: ", error.message);        
      res.status(500).send(error.message);
  }
});

// const getFilesInFolder = ("/get-files/:id", authenticateToken, async (req, res) => {
//   const folderId = req.params.id;
//   const userId = req.user.userId;

//   try {
//     let pool = await sql.connect(config);

//     const result = await pool.request()
//       .input("folderId", sql.Int, folderId)
//       .input("userId", sql.Int, userId)
//       .query("SELECT * FROM files WHERE folder_id = @folderId AND user_id = @userId AND is_active = 1");

//     if (result.recordset.length === 0) {
//       return res.status(404).send("No files found in this folder.");
//     }

//     res.status(200).json(result.recordset);

//   } catch (err) {
//     res.status(500);
//     res.send(err.message);
//   }
// });


async function listBlobsByFolder(containerName, userId, folderId) {
  //const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobs = [];

    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('userId', sql.Int, userId)
      .input('folderId', sql.Int, folderId)
      .query("SELECT * FROM files WHERE user_id = @userId AND folder_id = @folderId");

    const metadata = result.recordset;

  

    for await (const blob of containerClient.listBlobsFlat()) {
      const blobMetadata = metadata.find(m => m.name === blob.name);

      if (blobMetadata) {
        blobs.push({
          blobName: blob.name,
          filename: blob.name.split('-').slice(1).join('-'), // Extract original filename
          metadata: blobMetadata,
        });
      }
    }

  return blobs;
}

const getFilesInFolder = ('/get-files/:id', async(req, res) => {
  const userId = req.user.userId;
  const folderId = req.params.id;

  try {
      const blobs = await listBlobsByFolder(containerName, userId, folderId);

      res.status(200).send(blobs);
      console.log(blobs);

  } catch(err) {
      console.log("Error getting files: ", err.message);
      res.status(500).send(err.message);
  }    
});


const deleteFile = ("/delete-file/:folderId/:fileId", authenticateToken, async (req, res) => {
  const folderId = req.params.folderId;
  const fileId = req.params.fileId;
  const userId = req.user.userId;

  try {
    let pool = await sql.connect(config);

    const fileResult = await pool.request()
      .input('folderId', sql.Int, folderId)
      .input('fileId', sql.Int, fileId)
      .input('userId', sql.Int, userId)
      .query('SELECT name FROM files WHERE folder_id = @folderId AND id = @fileId AND user_id = @userId');

    const file = fileResult.recordset[0];

    console.log(fileResult);
    

    if (!file) {
      return res.status(404).send({ message: `File with ID ${fileId} not found in folder ID ${folderId}.` });
    }

    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blobClient = containerClient.getBlockBlobClient(file.name);
    await blobClient.deleteIfExists();
    console.log(`Deleted blob: ${file.name}`);

    const result = await pool.request()
      .input("fileId", sql.Int, fileId)
      .query("DELETE files WHERE id = @fileId");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("File not found.");
    }

    res.status(200).json({ message: "File deleted successfully." });

  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
});

export default { upload, createFolder, getFolders, deleteFolder, uploadFile, getFilesInFolder, deleteFile };




