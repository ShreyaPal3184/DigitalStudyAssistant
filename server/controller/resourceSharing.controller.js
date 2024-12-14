import sql from "mssql";
import config from "./config.js"
import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import { authenticateToken } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = process.env.AZURE_CONTAINER_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);


const uploadFile = ('/upload', async (req, res) => {
    const file = req.file;
    const { description } = req.body;
    const userId = req.user.userId;
    
    // console.log(req.file);
    // console.log(req.file);
    // console.log(req.body);    
        

    if(!req.file) {
        return res.status(400).send("No file uploaded");
    }

    if(!description) {
        return res.status(400).send("No description provided");
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
            .input("fileName", sql.VarChar, fileName)
            .input("fileUrl", sql.VarChar, fileUrl)
            .input("description", sql.VarChar, description)
            .query("INSERT INTO resources (userId, fileName, fileUrl, description) VALUES (@userId, @fileName, @fileUrl, @description)");
        
        res.status(200).send("File uploaded successfully");
    } catch (error) {
        console.log("Error uploading file: ", error.message);        
        res.status(500).send(error.message);
    }
});



async function listBlobs(containerName) {
    //const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobs = [];

    const pool = await sql.connect(config);
    const result = await pool.request()
        .query("SELECT * FROM resources");
    const metadata = result.recordset;

    

    for await (const blob of containerClient.listBlobsFlat()) {
        const blobMetadata = metadata.find(m => m.fileName === blob.name);
        if (blobMetadata) {
            const userResult = await pool.request()
                .input('userId', sql.Int, blobMetadata.userId) 
                .query("SELECT * FROM users WHERE id = @userId");
    
            const userData = userResult.recordset[0];
        
            blobs.push({ 
                blobName: blob.name, 
                filename: blob.name.split('-').slice(1).join('-'), 
                /*properties: blob.properties,*/
                metadata: metadata.find(m => m.fileName === blob.name),
                user: userData
            });
        }
    }

    return blobs;
}

const getFiles = ('/get', async(req, res) => {
    try {
        const blobs = await listBlobs(containerName);

        res.status(200).send(blobs);
        console.log(blobs);

    } catch(err) {
        console.log("Error getting files: ", err.message);
        res.status(500).send(err.message);
    }    
});



async function getBlobById(id) {
    const pool = await sql.connect(config);
    const result = await pool.request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM resources WHERE id = @id")
    
    if(result.recordset.length === 0) {
        throw new Error("Blob not found");
    }

    const metadata = result.recordset[0];
    const blobName = metadata.fileName;

    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const exists = await blobClient.exists();
    if (!exists) {
      throw new Error("Blob not found in Azure Blob Storage");
    }

    const filename = blobName.split("-").slice(1).join("-");

    return {
      id,
      blobName,
      filename,
      properties,
      metadata,
    };
}


const getFilesById = ('/get/:id', async(req, res) => {
    try {
        const blobs = await listBlobs(containerName);

        for(const b in blobs) {
            if(blobs[b].metadata.id === parseInt(req.params.id)) {
                res.status(200).send(blobs[b]);
                console.log(blobs[b]);
                return;
            }
        }

    } catch(err) {
        console.log("Error getting files: ", err.message);
        res.status(500).send(err.message);
    }    
});


const getUserFile = ('/user', authenticateToken, async (req, res) => {
    const userId = req.user.userId;

    if(!userId) {
        return res.status(400).send("User not found");
    }

    try {
        const blobs = await listBlobs(containerName);

        for(const b in blobs) {
            if(blobs[b].metadata.userId === parseInt(userId)) {
                res.status(200).send(blobs[b]);
                console.log(blobs[b]);
                return;
            }
        }

    } catch(err) {
        console.log("Error getting files: ", err.message);
        res.status(500).send(err.message);
    }
});


export default { upload, uploadFile, getFiles, getFilesById, getUserFile };