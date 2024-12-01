import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { authenticateToken } from "./routes/middleware/authMiddleware.js";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
  });