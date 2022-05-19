"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveProductWarehouseService = void 0;

var _ProductRepository = require("../../../repositories/in-memory/ProductRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _class;

let RemoveProductWarehouseService = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _ProductRepository.ProductRepository === "undefined" ? Object : _ProductRepository.ProductRepository]), _dec(_class = _dec2(_class = _dec3(_class = class RemoveProductWarehouseService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(warehouseId) {
    this.productRepository.unassignLocation(warehouseId);
  }

}) || _class) || _class) || _class);
exports.RemoveProductWarehouseService = RemoveProductWarehouseService;