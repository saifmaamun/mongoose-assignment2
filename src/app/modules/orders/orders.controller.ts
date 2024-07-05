import { Request, Response } from "express";
import { OrderService } from "./orders.service";

// place an order
const placeOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderService.placeOrderInToDB(orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err || err.message,
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
          message: `No orders found for email: ${trimmedEmail}`,
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
      message: "Orders retrieved failed",
      error: err.message || err,
    });
  }
};

export const OrderController = {
  placeOrder,
  getOrder,
};
