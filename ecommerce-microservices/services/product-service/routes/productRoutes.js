const express = require("express");
const Product = require("../models/Product");
const sendNotification = require("../kafkaProducer");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Multer storage for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

// Create a new product (Admin Only)
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const { name, description, price, category, stock } = req.body;
    const image = req.file ? req.file.filename : "";

    const newProduct = new Product({ name, description, price, category, stock, image });
    await newProduct.save();

    // Notify about new product
    sendNotification({
      message: `New product added: ${newProduct.name}`,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Update product (Admin Only)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete product (Admin Only)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
