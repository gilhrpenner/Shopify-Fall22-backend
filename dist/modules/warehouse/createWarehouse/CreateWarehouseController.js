"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateWarehouseController = void 0;

var _tsyringe = require("tsyringe");

var _CreateWarehouseService = require("./CreateWarehouseService");

var _dec, _dec2, _dec3, _class;

let CreateWarehouseController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _CreateWarehouseService.CreateWarehouseService === "undefined" ? Object : _CreateWarehouseService.CreateWarehouseService]), _dec(_class = _dec2(_class = _dec3(_class = class CreateWarehouseController {
  constructor(createWarehouseService) {
    this.createWarehouseService = createWarehouseService;
  }

  async handle(req, res) {
    const response = await this.createWarehouseService.execute(req.body);
    return res.json(response).status(201);
  }

}) || _class) || _class) || _class);
exports.CreateWarehouseController = CreateWarehouseController;