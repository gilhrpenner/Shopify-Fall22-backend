"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductQuantityController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _UpdateProductQuantityController = require("./UpdateProductQuantityController");

const updateProductQuantityController = _tsyringe.container.resolve(_UpdateProductQuantityController.UpdateProductQuantityController);

exports.updateProductQuantityController = updateProductQuantityController;