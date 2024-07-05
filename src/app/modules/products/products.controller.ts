/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import ProductValidationSchema from "./products.validation";

// create a new product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const zodParsedData = ProductValidationSchema.parse(productData);
    const result = await ProductServices.productCreateInToDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: err.message || err,
    });
  }
};

// get all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
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
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
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
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Product not found",
      error: err || err.message,
    });
  }
};

//update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body.partial();
    // const zodParsedData = ProductValidationSchema.parse(productData);

    const result = await ProductServices.updateSingleProductFromDB(
      productId,
      productData
    );
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Product not found",
      error: err || err.message,
    });
  }
};

// search product
const searchProduct = async (req: Request, res: Response) => {
  try {
    const searchTerm = (req.query.name as string).trim();

    const result = await ProductServices.searchProductsFromDB(searchTerm);
    res.status(200).json({
      success: true,
      message: `searchTermsProducts matching search term ${searchTerm} fetched successfully!`,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `"Product not found"`,
      error: err || err.message,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateSingleProduct,
  searchProduct,
};
