import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { createProxyMiddleware } from "http-proxy-middleware";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// Load service URLs from environment variables
const SERVICES = {
  auth: process.env.AUTH_SERVICE_URL || "http://localhost:5001",
  product: process.env.PRODUCT_SERVICE_URL || "http://localhost:5002",
  order: process.env.ORDER_SERVICE_URL || "http://localhost:5003",
  cart: process.env.CART_SERVICE_URL || "http://localhost:5004",
  notification: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5005",
};

// JWT Authentication Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

// Route Definitions & Proxies
app.use("/auth", createProxyMiddleware({ target: SERVICES.auth, changeOrigin: true }));
app.use("/products", createProxyMiddleware({ target: SERVICES.product, changeOrigin: true }));
app.use("/cart", verifyToken, createProxyMiddleware({ target: SERVICES.cart, changeOrigin: true }));
app.use("/orders", verifyToken, createProxyMiddleware({ target: SERVICES.order, changeOrigin: true }));
app.use("/notifications", verifyToken, createProxyMiddleware({ target: SERVICES.notification, changeOrigin: true }));

// Fallback Route
app.use("*", (req, res) => res.status(404).json({ message: "API Gateway: Route Not Found" }));

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
