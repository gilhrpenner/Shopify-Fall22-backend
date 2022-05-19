"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssignWarehouseController = void 0;

var _tsyringe = require("tsyringe");

var _AssignWarehouseService = require("./AssignWarehouseService");

var _dec, _dec2, _dec3, _class;

let AssignWarehouseController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _AssignWarehouseService.AssignWarehouseService === "undefined" ? Object : _AssignWarehouseService.AssignWarehouseService]), _dec(_class = _dec2(_class = _dec3(_class = class AssignWarehouseController {
  constructor(assignWarehouseService) {
    this.assignWarehouseService = assignWarehouseService;
  }

  async handle(req, res) {
    const response = await this.assignWarehouseService.execute(req.body);
    return res.json(response);
  }

}) || _class) || _class) || _class);
exports.AssignWarehouseController = AssignWarehouseController;