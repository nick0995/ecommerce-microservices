const express = require("express");
const Product = require("../models/Product.js");
const sendNotification = require("../kafka/kafkaProducer.js");
const {
  authenticateUser,
  authorizeAdmin,
} = require("../middleware/authMiddleware.js");
const multer = require("multer");

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Create a new product (Admin Only)
router.post(
  "/",
  authenticateUser,
  authorizeAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;
      const image = req.file ? req.file.filename : "";

      const newProduct = new Product({
        name,
        description,
        price,
        category,
        stock,
        image,
      });
      await newProduct.save();

      // Notify about new product
      sendNotification({ message: `New product added: ${newProduct.name}` });

      res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
  }
);

// ✅ Get all products (Public)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ✅ Get a single product by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// ✅ Update product (Admin Only)
router.put("/:id", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// ✅ Delete product (Admin Only)
router.delete("/:id", authenticateUser, authorizeAdmin, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
