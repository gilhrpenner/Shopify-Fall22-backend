"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProductController = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _CreateProductController = require("./CreateProductController");

const createProductController = _tsyringe.container.resolve(_CreateProductController.CreateProductController);

exports.createProductController = createProductController;