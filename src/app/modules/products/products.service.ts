import { TProduct } from "./products.interface";
import { ProductModel } from "./products.model";

const productCreateInToDB = async (product: TProduct) => {
  const productData = await ProductModel.create(product);
  return productData;
};

export const ProductServices = {
  productCreateInToDB,
};
