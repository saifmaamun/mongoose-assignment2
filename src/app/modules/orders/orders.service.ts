import mongoose from "mongoose";
import { ProductModel } from "../products/products.model";
import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

// place an order
const placeOrderInToDB = async (orderData: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Get the product
    const product = await ProductModel.findById(orderData.productId).session(
      session
    );
    if (!product) {
      throw new Error("Product not found");
    }

    // Check product availability
    if (
      !product.inventory.inStock ||
      product.inventory.quantity < orderData.quantity
    ) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Calculate the new quantity
    const newQuantity = product.inventory.quantity - orderData.quantity;
    const inStock = newQuantity > 0;

    // Calculate the total price
    const totalPrice = orderData.quantity * product.price;

    // Place the order with calculated price
    const newOrder = new OrderModel({
      ...orderData,
      price: totalPrice,
    });
    await newOrder.save({ session });

    // Update the product inventory
    await ProductModel.updateOne(
      { _id: orderData.productId },
      {
        $set: {
          "inventory.quantity": newQuantity,
          "inventory.inStock": inStock,
        },
      },
      { session }
    );

    // Commit the transaction if both operations are successful
    await session.commitTransaction();
    session.endSession();

    return { order: newOrder, totalPrice };
  } catch (error) {
    // Abort the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
//get all orders
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// get order by user email
const getOrderByEmailFromDB = async (email: string) => {
  const result = await OrderModel.find({
    email: { $eq: email },
  });
  return result;
};

export const OrderService = {
  placeOrderInToDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};
