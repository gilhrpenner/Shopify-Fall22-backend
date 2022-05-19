"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteProductController = void 0;

var _tsyringe = require("tsyringe");

var _DeleteProductService = require("./DeleteProductService");

var _dec, _dec2, _dec3, _class;

let DeleteProductController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _DeleteProductService.DeleteProductService === "undefined" ? Object : _DeleteProductService.DeleteProductService]), _dec(_class = _dec2(_class = _dec3(_class = class DeleteProductController {
  constructor(deleteProductService) {
    this.deleteProductService = deleteProductService;
  }

  async handle(req, res) {
    const response = await this.deleteProductService.execute(req.body);
    return res.json(response);
  }

}) || _class) || _class) || _class);
exports.DeleteProductController = DeleteProductController;