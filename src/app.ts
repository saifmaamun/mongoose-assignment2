import express, { Request, Response } from "express";
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

app.get("/", (req: Request, res: Response) => {
  res.send("There is nothing either good or bad, but thinking makes it so.");
});

export default app;
