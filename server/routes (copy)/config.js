import dotenv from "dotenv";    
dotenv.config();

const config = {
    user: process.env.AZURE_SQL_USER,
    password: process.env.AZURE_SQL_PASSWORD,
    server: "dsa-sqlsvr.database.windows.net",
    port: 1433,
    database: process.env.AZURE_SQL_DATABASE
}

export default config;