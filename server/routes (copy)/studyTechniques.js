import express from "express";
import sql from "mssql";
import config from "./config.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/technique", async (req, res) => {
    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .query("SELECT * FROM techniques");

        if(result.recordset.length === 0) {
            return res.status(404).send("No study techniques found.");
        }

        res.status(200).json(result.recordset);

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

router .get("/technique/:id", async (req, res) => {
    const id = req.params.id;

    try {
        let pool = await sql.connect(config);

        const result = await pool.request()
            .input("id", sql.Int, id)
            .query("SELECT * FROM techniques WHERE id = @id");
        
        if(result.recordset.length === 0) {
            return res.status(404).send("Study technique not found.");
        }

        res.status(200).json(result.recordset[0]);

    } catch(err) {
        res.status(500);
        res.send(err.message);
    }
});

export default router;