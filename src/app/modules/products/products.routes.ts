import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);

export const ProductRoutes = router;
