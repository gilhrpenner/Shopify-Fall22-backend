"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateWarehouseService = void 0;

var _WarehouseRepository = require("../../../repositories/in-memory/WarehouseRepository");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _warehouse = require("../../../shared/validations/warehouse.validations");

var _dec, _dec2, _dec3, _class;

let UpdateWarehouseService = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _WarehouseRepository.WarehouseRepository === "undefined" ? Object : _WarehouseRepository.WarehouseRepository]), _dec(_class = _dec2(_class = _dec3(_class = class UpdateWarehouseService {
  constructor(warehouseRepository) {
    this.warehouseRepository = warehouseRepository;
  }

  async execute(id, payload) {
    const {
      error: invalidInput
    } = (0, _warehouse.upsertWarehouseValidation)(payload);

    if (invalidInput) {
      throw new _AppError.AppError(invalidInput.details[0].message, 422);
    }

    const warehouse = await this.warehouseRepository.findById(id);

    if (!warehouse) {
      throw new _AppError.AppError('Warehouse not found', 404);
    }

    return this.warehouseRepository.update(id, payload);
  }

}) || _class) || _class) || _class);
exports.UpdateWarehouseService = UpdateWarehouseService;