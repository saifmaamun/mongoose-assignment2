import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.get("/:productId", ProductController.getSingleProduct);
router.delete("/:productId", ProductController.deleteSingleProduct);
router.put("/:productId", ProductController.updateSingleProduct);
router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProducts);

export const ProductRoutes = router;
