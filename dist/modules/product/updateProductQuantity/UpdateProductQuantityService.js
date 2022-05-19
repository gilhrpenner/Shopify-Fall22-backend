"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateProductQuantityService = void 0;

var _ProductRepository = require("../../../repositories/in-memory/ProductRepository");

var _tsyringe = require("tsyringe");

var _AppError = require("../../../shared/errors/AppError");

var _product = require("../../../shared/validations/product.validation");

var _dec, _dec2, _dec3, _class;

let UpdateProductQuantityService = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _ProductRepository.ProductRepository === "undefined" ? Object : _ProductRepository.ProductRepository]), _dec(_class = _dec2(_class = _dec3(_class = class UpdateProductQuantityService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(payload) {
    const {
      barcode,
      quantity
    } = payload;
    const {
      error: invalidInput
    } = (0, _product.updateProductQuantityValidation)(payload);

    if (invalidInput) {
      throw new _AppError.AppError(invalidInput.details[0].message, 422);
    }

    const existingProduct = await this.productRepository.findByBarcode(payload.barcode);

    if (!existingProduct) {
      throw new _AppError.AppError('Product does not exists');
    }

    return this.productRepository.updateQuantity(barcode, quantity);
  }

}) || _class) || _class) || _class);
exports.UpdateProductQuantityService = UpdateProductQuantityService;