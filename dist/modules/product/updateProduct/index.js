"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateProductController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _UpdateProductController = require("./UpdateProductController");

const updateProductController = _tsyringe.container.resolve(_UpdateProductController.UpdateProductController);

exports.updateProductController = updateProductController;