"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteWarehouseController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _DeleteWarehouseController = require("./DeleteWarehouseController");

const deleteWarehouseController = _tsyringe.container.resolve(_DeleteWarehouseController.DeleteWarehouseController);

exports.deleteWarehouseController = deleteWarehouseController;