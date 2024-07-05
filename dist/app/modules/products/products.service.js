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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const products_model_1 = require("./products.model");
// create a product
const productCreateInToDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.create(product);
    return result;
});
//get all products
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.find();
    return result;
});
// get single product
const getSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.findOne({ _id });
    return result;
});
// delete single product
const deleteSingleProductFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.deleteOne({ _id });
    return result;
});
// Update single product
const updateSingleProductFromDB = (_id, 
// data: Partial<DocumentDefinition<typeof ProductModel>>
data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.findOneAndUpdate({ _id }, { $set: data }, { upsert: true, new: true });
    return result;
});
// search products by name
const searchProductsFromDB = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.ProductModel.find({
        name: { $regex: name, $options: "i" },
    });
    return result;
});
exports.ProductServices = {
    productCreateInToDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteSingleProductFromDB,
    updateSingleProductFromDB,
    searchProductsFromDB,
};
