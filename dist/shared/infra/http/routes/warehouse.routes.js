"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warehouseRoutes = void 0;

var _createWarehouse = require("../../../../modules/warehouse/createWarehouse");

var _deleteWarehouse = require("../../../../modules/warehouse/deleteWarehouse");

var _updateWarehouse = require("../../../../modules/warehouse/updateWarehouse");

var _express = require("express");

const warehouseRoutes = (0, _express.Router)();
exports.warehouseRoutes = warehouseRoutes;
warehouseRoutes.post('/', async (req, res) => {
  return _createWarehouse.createWarehouseController.handle(req, res);
});
warehouseRoutes.put('/:id', async (req, res) => {
  return _updateWarehouse.updateWarehouseController.handle(req, res);
});
warehouseRoutes.delete('/:id', async (req, res) => {
  return _deleteWarehouse.deleteWarehouseController.handle(req, res);
});