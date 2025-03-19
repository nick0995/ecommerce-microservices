import express from "express";
import { getNotifications, markAsRead } from "../controllers/notificationController.js";

const router = express.Router();

router.get("/:userId", getNotifications);
router.patch("/:id/read", markAsRead);

export default router;
