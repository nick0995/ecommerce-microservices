import Notification from "../models/Notification.js";

// Fetch notifications for a user
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.params.userId });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { read: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};
