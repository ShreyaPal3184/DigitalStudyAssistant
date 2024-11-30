import sql from "mssql";
import dotenv from "dotenv";    

const db = {
    user: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: process.env.AZURE_SQL_SERVER,
    port: process.env.AZURE_SQL_PORT,
    database: process.env.AZURE_SQL_DATABASE    
}

export default db;