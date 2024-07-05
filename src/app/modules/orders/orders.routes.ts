import express from "express";
import { OrderController } from "./orders.controller";

const router = express.Router();

router.get("/", OrderController.getOrder);
router.post("/", OrderController.placeOrder);

export const OrderRoutes = router;
