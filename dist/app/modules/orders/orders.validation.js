"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string().nonempty(),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().min(1),
});
exports.default = OrderValidationSchema;
// type TProduct = z.infer<typeof ProductValidationSchema>;
