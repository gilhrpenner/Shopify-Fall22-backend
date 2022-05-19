"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteWarehouseController = void 0;

var _RemoveProductWarehouseService = require("../../product/removeProductWarehouse/RemoveProductWarehouseService");

var _tsyringe = require("tsyringe");

var _DeleteWarehouseService = require("./DeleteWarehouseService");

var _dec, _dec2, _dec3, _class;

let DeleteWarehouseController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _DeleteWarehouseService.DeleteWarehouseService === "undefined" ? Object : _DeleteWarehouseService.DeleteWarehouseService, typeof _RemoveProductWarehouseService.RemoveProductWarehouseService === "undefined" ? Object : _RemoveProductWarehouseService.RemoveProductWarehouseService]), _dec(_class = _dec2(_class = _dec3(_class = class DeleteWarehouseController {
  constructor(deleteWarehouseService, removeProductWarehouseService) {
    this.deleteWarehouseService = deleteWarehouseService;
    this.removeProductWarehouseService = removeProductWarehouseService;
  }

  async handle(req, res) {
    const {
      id
    } = req.params;
    await this.deleteWarehouseService.execute(id);
    await this.removeProductWarehouseService.execute(id);
    return res.json({
      message: 'Warehouse deleted'
    });
  }

}) || _class) || _class) || _class);
exports.DeleteWarehouseController = DeleteWarehouseController;