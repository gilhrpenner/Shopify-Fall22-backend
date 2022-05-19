"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteProductController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _DeleteProductController = require("./DeleteProductController");

const deleteProductController = _tsyringe.container.resolve(_DeleteProductController.DeleteProductController);

exports.deleteProductController = deleteProductController;