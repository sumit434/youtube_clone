// File: BACKEND/index.js

import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import DBConnection from "./config/db.js";
import authRoutes from "./routes/auth.js"; 
import channelRoutes from './routes/channels.js';

import userRoutes from "./routes/users.js";
import videoRoutes from "./routes/videos.js"

dotenv.config({ path: "./config/.env" });  

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));


DBConnection();


app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.originalUrl}`);
  next();
});

// User routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes); 
app.use('/api/v1/videos', videoRoutes);
app.use('/api/v1/channels', channelRoutes); 
//server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
