import { model, Schema } from "mongoose";
import { TOrder } from "./orders.interface";

const OrderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const OrderModel = model<TOrder>("order", OrderSchema);
