"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateProductController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateProductService = require("./UpdateProductService");

var _dec, _dec2, _dec3, _class;

let UpdateProductController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _UpdateProductService.UpdateProductService === "undefined" ? Object : _UpdateProductService.UpdateProductService]), _dec(_class = _dec2(_class = _dec3(_class = class UpdateProductController {
  constructor(updateProductService) {
    this.updateProductService = updateProductService;
  }

  async handle(req, res) {
    const response = await this.updateProductService.execute(req.body);
    return res.json(response);
  }

}) || _class) || _class) || _class);
exports.UpdateProductController = UpdateProductController;