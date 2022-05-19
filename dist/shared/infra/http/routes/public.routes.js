"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicRoutes = void 0;

var _ProductRepository = require("../../../../repositories/in-memory/ProductRepository");

var _WarehouseRepository = require("../../../../repositories/in-memory/WarehouseRepository");

var _express = require("express");

const publicRoutes = (0, _express.Router)();
exports.publicRoutes = publicRoutes;
publicRoutes.get('/', async (req, res) => {
  res.render('index', {
    products: _ProductRepository.memoryProducts,
    warehouses: _WarehouseRepository.memoryWarehouses
  });
});