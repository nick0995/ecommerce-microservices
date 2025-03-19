require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("../config/db");
const orderRoutes = require("../routes/orderRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
