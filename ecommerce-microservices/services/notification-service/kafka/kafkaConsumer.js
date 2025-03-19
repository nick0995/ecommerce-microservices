import kafka from "kafka-node";
import Notification from "../models/Notification.js";
import { io } from "../websocket/socket.js"; // Import WebSocket instance

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(client, [{ topic: "notifications", partition: 0 }], { autoCommit: true });

consumer.on("message", async (message) => {
  const { userId, message: text } = JSON.parse(message.value);

  try {
    const notification = new Notification({ userId, message: text });
    await notification.save();

    // Emit real-time update to frontend
    io.to(userId).emit("newNotification", notification);
  } catch (error) {
    console.error("Error saving notification:", error);
  }
});
