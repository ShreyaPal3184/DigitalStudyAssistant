import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import cron from 'node-cron';
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import sessionRoutes from "./routes/sessions.js";
import studyTechRoutes from "./routes/studyTechniques.js";
import translateRoutes from "./routes/nlp/translator.js";
import languageRoutes from "./routes/nlp/language.js";
import friendshipRoutes from "./routes/friendships.js";
import resourceSharingRoutes from "./routes/resourceSharing.js";
import containerRoutes from "./routes/container.route.js";
import foldersRoutes from "./routes/folders.routes.js";
import { updateSessionStatuses } from './jobs/sessionJobs.js'; // Import the job

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/studytechniques", studyTechRoutes);
app.use("/api", translateRoutes);
app.use("/api", languageRoutes);
app.use("/api/friendship", friendshipRoutes);
app.use("/api/resource", resourceSharingRoutes);
app.use("/api/container", containerRoutes);
app.use("/api/folders", foldersRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Schedule the job to run every minute
cron.schedule('* * * * *', updateSessionStatuses);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});

export default app;