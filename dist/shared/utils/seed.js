"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedWarehouses = exports.seedProducts = void 0;

var _ProductRepository = require("../../repositories/in-memory/ProductRepository");

var _WarehouseRepository = require("../../repositories/in-memory/WarehouseRepository");

var _common = require("./common.jest");

const seedWarehouses = async () => {
  const warehouseRepository = new _WarehouseRepository.WarehouseRepository();
  await warehouseRepository.create(_common.firstWarehouse);
  await warehouseRepository.create(_common.secondWarehouse);
  await warehouseRepository.create(_common.thirdWarehouse);
};

exports.seedWarehouses = seedWarehouses;

const seedProducts = async () => {
  const productRepository = new _ProductRepository.ProductRepository();
  await productRepository.create(_common.firstProduct);
  await productRepository.create(_common.secondProduct);
  await productRepository.create(_common.thirdProduct);
  await productRepository.create(_common.fourthProduct);
  await productRepository.create(_common.fifthProduct);
};

exports.seedProducts = seedProducts;