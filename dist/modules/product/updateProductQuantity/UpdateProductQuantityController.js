"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateProductQuantityController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateProductQuantityService = require("./UpdateProductQuantityService");

var _dec, _dec2, _dec3, _class;

let UpdateProductQuantityController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _UpdateProductQuantityService.UpdateProductQuantityService === "undefined" ? Object : _UpdateProductQuantityService.UpdateProductQuantityService]), _dec(_class = _dec2(_class = _dec3(_class = class UpdateProductQuantityController {
  constructor(updateProductQuantityService) {
    this.updateProductQuantityService = updateProductQuantityService;
  }

  async handle(req, res) {
    const response = await this.updateProductQuantityService.execute(req.body);
    return res.json(response);
  }

}) || _class) || _class) || _class);
exports.UpdateProductQuantityController = UpdateProductQuantityController;