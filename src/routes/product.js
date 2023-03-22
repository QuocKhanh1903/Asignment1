import express from 'express';
import { create, getOne, getAll, remove, update } from "../controllers/product.js";
const router = express.Router();
router.get("/products", getAll);
router.post("/products", create);
router.delete("/products/:id", remove);
router.put("/products/:id", update);
router.get("/products/:id", getOne);
export default router;