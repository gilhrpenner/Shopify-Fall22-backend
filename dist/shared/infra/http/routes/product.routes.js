"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productRoutes = void 0;

var _assignWarehouse = require("../../../../modules/product/assignWarehouse");

var _createProduct = require("../../../../modules/product/createProduct");

var _deleteProduct = require("../../../../modules/product/deleteProduct");

var _updateProduct = require("../../../../modules/product/updateProduct");

var _updateProductQuantity = require("../../../../modules/product/updateProductQuantity");

var _express = require("express");

const productRoutes = (0, _express.Router)();
exports.productRoutes = productRoutes;
productRoutes.post('/', async (req, res) => {
  return _createProduct.createProductController.handle(req, res);
});
productRoutes.patch('/quantity', async (req, res) => {
  return _updateProductQuantity.updateProductQuantityController.handle(req, res);
});
productRoutes.patch('/', async (req, res) => {
  return _updateProduct.updateProductController.handle(req, res);
});
productRoutes.delete('/', async (req, res) => {
  return _deleteProduct.deleteProductController.handle(req, res);
});
productRoutes.patch('/location', async (req, res) => {
  return _assignWarehouse.assignWarehouseController.handle(req, res);
});