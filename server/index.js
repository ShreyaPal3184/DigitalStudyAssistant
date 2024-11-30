import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/user", userRoutes.createUser);

app.listen(port, () => {
    console.log(`App running on port ${PORT}.`);
  });