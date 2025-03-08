import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import ConnectToDB from "./config/db.config.js";
import removeUnverifiedUsers from "./automation/removeUnverifedUsers.js";

const app = express();

// ENV VARIABLES
const PORT = process.env.PORT;

// Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

//automation
removeUnverifiedUsers();

app.listen(PORT, () => {
  ConnectToDB();
  console.log(`Server started on PORT: ${PORT}`);
});
