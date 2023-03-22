import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/product";
const app = express();
app.use(express.json());
app.use("/api", productRouter);
mongoose.connect("mongodb://127.0.0.1:27017/we17302");
export const viteNodeApp = app;