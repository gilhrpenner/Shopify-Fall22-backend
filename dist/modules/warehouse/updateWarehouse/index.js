"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateWarehouseController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _UpdateWarehouseController = require("./UpdateWarehouseController");

const updateWarehouseController = _tsyringe.container.resolve(_UpdateWarehouseController.UpdateWarehouseController);

exports.updateWarehouseController = updateWarehouseController;