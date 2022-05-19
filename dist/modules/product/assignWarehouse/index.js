"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignWarehouseController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _AssignWarehouseController = require("./AssignWarehouseController");

const assignWarehouseController = _tsyringe.container.resolve(_AssignWarehouseController.AssignWarehouseController);

exports.assignWarehouseController = assignWarehouseController;