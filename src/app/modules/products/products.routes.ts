import express from "express";
import { ProductController } from "./products.controller";

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/:productId", ProductController.getSingleProduct);
router.delete("/:productId", ProductController.deleteSingleProduct);
router.put("/:productId", ProductController.updateSingleProduct);
router.get("/", ProductController.searchProduct);
router.post("/", ProductController.createProduct);

export const ProductRoutes = router;
