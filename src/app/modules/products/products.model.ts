import { Schema, model } from "mongoose";
import {
  TInventory,
  TProduct,
  TProductModel,
  TVariants,
} from "./products.interface";

const VariantSchema = new Schema<TVariants>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

const ProductSchema = new Schema<TProduct, TProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [VariantSchema], required: true },
  inventory: { type: InventorySchema, required: true },
});

// checking for same product
ProductSchema.statics.isProductExist = async function (name: string) {
  const existingProduct = await ProductModel.findOne({ name });
  return existingProduct;
};

export const ProductModel = model<TProduct, TProductModel>(
  "product",
  ProductSchema
);
