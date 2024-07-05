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
exports.OrderController = void 0;
const orders_service_1 = require("./orders.service");
const orders_validation_1 = __importDefault(require("./orders.validation"));
// place an order
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParsedData = orders_validation_1.default.parse(orderData);
        const result = yield orders_service_1.OrderService.placeOrderInToDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Order creation failed",
            error: err.message || err,
        });
    }
});
// get orders
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        // if email is given then execute the orders by email
        if (email) {
            // Get orders by email
            const trimmedEmail = email.trim();
            const result = yield orders_service_1.OrderService.getOrderByEmailFromDB(trimmedEmail);
            if (result.length === 0) {
                res.status(404).json({
                    success: false,
                    message: `Order not found`,
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for ${trimmedEmail}!`,
                data: result,
            });
        }
        //  if email is not given then execute the orders by email
        else {
            // Get all orders
            const result = yield orders_service_1.OrderService.getAllOrdersFromDB();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Order not found",
            error: err.message || err,
        });
    }
});
exports.OrderController = {
    placeOrder,
    getOrder,
};
