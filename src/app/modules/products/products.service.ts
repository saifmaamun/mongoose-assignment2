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

export const ProductServices = {
  productCreateInToDB,
  getAllProductsFromDB,
};
