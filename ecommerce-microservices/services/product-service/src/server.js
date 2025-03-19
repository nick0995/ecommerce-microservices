require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");
const productRoutes = require("../routes/productRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Product Service running on port ${PORT}`));
