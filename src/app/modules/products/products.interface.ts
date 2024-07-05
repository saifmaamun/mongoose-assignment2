import { Model } from "mongoose";

export type TVariants = {
  type: string;
  value: string;
};
export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
};

// for static methods
export interface TProductModel extends Model<TProduct> {
  // eslint-disable-next-line no-unused-vars
  isProductExist(name: string): Promise<TProduct | null>;
}
