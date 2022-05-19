"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWarehouseController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _CreateWarehouseController = require("./CreateWarehouseController");

const createWarehouseController = _tsyringe.container.resolve(_CreateWarehouseController.CreateWarehouseController);

exports.createWarehouseController = createWarehouseController;