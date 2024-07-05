import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/products.routes";
import { OrderRoutes } from "./app/modules/orders/orders.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// product routes
app.use("/api/products", ProductRoutes);
// order routes
app.use("/api/orders", OrderRoutes);

// not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("There is nothing either good or bad, but thinking makes it so.");
});

export default app;
