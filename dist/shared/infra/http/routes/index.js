"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _product = require("./product.routes");

var _public = require("./public.routes");

var _warehouse = require("./warehouse.routes");

const router = (0, _express.Router)();
exports.router = router;
router.use('/', _public.publicRoutes);
router.use('/warehouse', _warehouse.warehouseRoutes);
router.use('/product', _product.productRoutes);