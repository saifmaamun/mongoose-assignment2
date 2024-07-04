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
      message: "Products retrived failed",
      error: err || err.message,
    });
  }
};

// get single product
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      status: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Product not found",
      error: err || err.message,
    });
  }
};

//delete single product
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteSingleProductFromDB(productId);
    res.status(200).json({
      status: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: "Product not found",
      error: err || err.message,
    });
  }
};

//update single product

// search single product

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
};
