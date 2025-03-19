import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Unread", "Read"],
    default: "Unread",
  },
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);
