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
exports.ProductController = void 0;
const products_service_1 = require("./products.service");
const products_validation_1 = __importDefault(require("./products.validation"));
// create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParsedData = products_validation_1.default.parse(productData);
        const result = yield products_service_1.ProductServices.productCreateInToDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product creation failed",
            error: err || err.message,
        });
    }
});
// get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield products_service_1.ProductServices.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Products retrived failed",
            error: err || err.message,
        });
    }
});
// get single product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err || err.message,
        });
    }
});
//delete single product
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductServices.deleteSingleProductFromDB(productId);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err || err.message,
        });
    }
});
//update single product
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body.partial();
        // const zodParsedData = ProductValidationSchema.parse(productData);
        const result = yield products_service_1.ProductServices.updateSingleProductFromDB(productId, productData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err || err.message,
        });
    }
});
// search product
const searchProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.name.trim();
        const result = yield products_service_1.ProductServices.searchProductsFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: `searchTermsProducts matching search term ${searchTerm} fetched successfully!`,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: `"Product not found"`,
            error: err || err.message,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteSingleProduct,
    updateSingleProduct,
    searchProduct,
};
