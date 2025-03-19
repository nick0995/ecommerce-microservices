import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Cart Service running on port ${PORT}`));
