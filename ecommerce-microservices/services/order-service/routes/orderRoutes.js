const express = require("express");
const Order = require("../models/Order");
const sendNotification = require("../kafka/kafkaProducer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Order
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { items, totalPrice } = req.body;
    const newOrder = new Order({ userId: req.user.id, items, totalPrice });

    await newOrder.save();

    // Notify user about order confirmation
    sendNotification({
      userId: req.user.id,
      message: "Your order has been placed successfully!"
    });

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
  }
});

// Get User Orders
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Update Order Status
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Notify user about order status update
    sendNotification({
      userId: order.userId,
      message: `Your order status has been updated to: ${status}`
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

module.exports = router;
