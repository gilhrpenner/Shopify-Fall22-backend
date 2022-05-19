"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateWarehouseService = void 0;

var _WarehouseRepository = require("../../../repositories/in-memory/WarehouseRepository");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _warehouse = require("../../../shared/validations/warehouse.validations");

var _dec, _dec2, _dec3, _class;

let CreateWarehouseService = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _WarehouseRepository.WarehouseRepository === "undefined" ? Object : _WarehouseRepository.WarehouseRepository]), _dec(_class = _dec2(_class = _dec3(_class = class CreateWarehouseService {
  constructor(warehouseRepository) {
    this.warehouseRepository = warehouseRepository;
  }

  async execute(payload) {
    const {
      error: invalidInput
    } = (0, _warehouse.upsertWarehouseValidation)(payload);

    if (invalidInput) {
      throw new _AppError.AppError(invalidInput.details[0].message, 422);
    } // If we had an account system or something better than just an address,
    // we would check if the warehouse already exists.


    return this.warehouseRepository.create(payload);
  }

}) || _class) || _class) || _class);
exports.CreateWarehouseService = CreateWarehouseService;