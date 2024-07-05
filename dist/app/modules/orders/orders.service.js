"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const products_model_1 = require("../products/products.model");
const orders_model_1 = require("./orders.model");
// place an order
const placeOrderInToDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Get the product
        const product = yield products_model_1.ProductModel.findById(orderData.productId).session(session);
        if (!product) {
            throw new Error("Product not found");
        }
        // Check product availability
        if (!product.inventory.inStock ||
            product.inventory.quantity < orderData.quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }
        // Calculate the new quantity
        const newQuantity = product.inventory.quantity - orderData.quantity;
        const inStock = newQuantity > 0;
        // Calculate the total price
        const totalPrice = orderData.quantity * product.price;
        // Place the order with calculated price
        const newOrder = new orders_model_1.OrderModel(Object.assign(Object.assign({}, orderData), { price: totalPrice }));
        yield newOrder.save({ session });
        // Update the product inventory
        yield products_model_1.ProductModel.updateOne({ _id: orderData.productId }, {
            $set: {
                "inventory.quantity": newQuantity,
                "inventory.inStock": inStock,
            },
        }, { session });
        // Commit the transaction if both operations are successful
        yield session.commitTransaction();
        session.endSession();
        return { order: newOrder, totalPrice };
    }
    catch (error) {
        // Abort the transaction if any operation fails
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
//get all orders
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrderModel.find();
    return result;
});
// get order by user email
const getOrderByEmailFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrderModel.find({
        email: { $eq: email },
    });
    return result;
});
exports.OrderService = {
    placeOrderInToDB,
    getAllOrdersFromDB,
    getOrderByEmailFromDB,
};
