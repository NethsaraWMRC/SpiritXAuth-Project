import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;

app.use("/api/auth", authRoutes);

connection.once("open", () => {
  console.log("MongoDB connection successful!");
});

app.listen(PORT, () => {
  console.log("Server is running on ", PORT);
});
