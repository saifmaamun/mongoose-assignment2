import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";

// create a product
const productCreateInToDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

//get all products
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// get single product
const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};
// delete single product
const deleteSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.deleteOne({ _id });
  return result;
};
// Update single product
// search products by name

export const ProductServices = {
  productCreateInToDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  deleteSingleProductFromDB,
};
