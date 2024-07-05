import { Request, Response } from "express";
import { OrderService } from "./orders.service";
import OrderValidationSchema from "./orders.validation";

// place an order
const placeOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const zodParsedData = OrderValidationSchema.parse(orderData);
    const result = await OrderService.placeOrderInToDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message || err,
    });
  }
};

// get orders
const getOrder = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    // if email is given then execute the orders by email
    if (email) {
      // Get orders by email
      const trimmedEmail = email.trim();
      const result = await OrderService.getOrderByEmailFromDB(trimmedEmail);

      if (result.length === 0) {
        res.status(404).json({
          success: false,
          message: `Order not found`,
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for ${trimmedEmail}!`,
        data: result,
      });
    }
    //  if email is not given then execute the orders by email
    else {
      // Get all orders
      const result = await OrderService.getAllOrdersFromDB();
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Order not found",
      error: err.message || err,
    });
  }
};

export const OrderController = {
  placeOrder,
  getOrder,
};
