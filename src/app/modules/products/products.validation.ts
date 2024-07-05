import { z } from "zod";

const VariantValidationSchema = z.object({
  type: z.string().nonempty(),
  value: z.string().nonempty(),
});

const InventoryValidationSchema = z.object({
  quantity: z.number().int().min(0),
  inStock: z.boolean(),
});

const ProductValidationSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  price: z.number().positive(),
  category: z.string().nonempty(),
  tags: z.array(z.string().nonempty()),
  variants: z.array(VariantValidationSchema),
  inventory: InventoryValidationSchema,
});

export default ProductValidationSchema;
