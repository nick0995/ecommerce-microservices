import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import connectDB from "../config/db.js";
import notificationRoutes from "../routes/notificationRoutes.js";
import { initializeSocket } from "../websocket/socket.js";
import consumer from ("../kafka/kafkaConsumer");

dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/notifications", notificationRoutes);
consumer.on("message", (message) => {
    console.log("New Notification Received:", JSON.parse(message.value));
  });
const server = createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 5004;
server.listen(PORT, () => console.log(`Notification Service running on port ${PORT}`));
