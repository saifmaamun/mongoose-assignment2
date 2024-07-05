"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_routes_1 = require("./app/modules/products/products.routes");
const orders_routes_1 = require("./app/modules/orders/orders.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// product routes
app.use("/api/products", products_routes_1.ProductRoutes);
// order routes
app.use("/api/orders", orders_routes_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("There is nothing either good or bad, but thinking makes it so.");
});
// not found routes
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
    next();
});
exports.default = app;
