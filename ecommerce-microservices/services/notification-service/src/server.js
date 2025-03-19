import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { initializeSocket } from "./websocket/socket.js";
import { createServer } from "http";

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRoutes);

const server = createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 5004;
server.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
