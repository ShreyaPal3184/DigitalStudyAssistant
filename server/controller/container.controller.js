import sql from "mssql";
import config from "./config.js"
import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import { authenticateToken } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;

const createContainer = async (req, res) => {
    const { containerName } = req.body;

    console.log(containerName);
    

    if (!containerName) {
        return res.status(400).send("Container name is required");
    }

    try {
        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        const exists = await containerClient.exists();
        if (exists) {
            return res.status(400).send("Container already exists");
        }

        await containerClient.create();
        res.status(201).send(`Container '${containerName}' created successfully`);
    } catch (error) {
        console.error("Error creating container:", error.message);
        res.status(500).send("Failed to create container");
    }
};


export default { createContainer };