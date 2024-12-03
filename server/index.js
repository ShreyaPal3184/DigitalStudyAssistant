import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import sessionRoutes from "./routes/sessions.js";
import studyTechRoutes from "./routes/studyTechniques.js";
import translateRoutes from "./routes/nlp/translator.js";

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
  });