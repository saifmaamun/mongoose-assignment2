import { TOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

// place an order
const placeOrderInToDB = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
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
