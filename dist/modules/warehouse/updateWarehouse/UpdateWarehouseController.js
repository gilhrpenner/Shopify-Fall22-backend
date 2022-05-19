"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateWarehouseController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateWarehouseService = require("./UpdateWarehouseService");

var _dec, _dec2, _dec3, _class;

let UpdateWarehouseController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _UpdateWarehouseService.UpdateWarehouseService === "undefined" ? Object : _UpdateWarehouseService.UpdateWarehouseService]), _dec(_class = _dec2(_class = _dec3(_class = class UpdateWarehouseController {
  constructor(updateWarehouseService) {
    this.updateWarehouseService = updateWarehouseService;
  }

  async handle(req, res) {
    const {
      id
    } = req.params;
    const response = await this.updateWarehouseService.execute(id, req.body);
    return res.json(response);
  }

}) || _class) || _class) || _class);
exports.UpdateWarehouseController = UpdateWarehouseController;