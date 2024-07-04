import { Request, Response } from "express";
import { ProductServices } from "./products.service";

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.productCreateInToDB(productData);
    res.status(200).json({
      status: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Product creation failed",
      error: err || err.message,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      status: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Product retrived failed",
      error: err || err.message,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
};
