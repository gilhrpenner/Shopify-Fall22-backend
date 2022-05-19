"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProductController = void 0;

var _tsyringe = require("tsyringe");

var _CreateProductService = require("./CreateProductService");

var _dec, _dec2, _dec3, _class;

let CreateProductController = (_dec = (0, _tsyringe.autoInjectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _CreateProductService.CreateProductService === "undefined" ? Object : _CreateProductService.CreateProductService]), _dec(_class = _dec2(_class = _dec3(_class = class CreateProductController {
  constructor(createProductService) {
    this.createProductService = createProductService;
  }

  async handle(req, res) {
    const response = await this.createProductService.execute(req.body);
    return res.json(response).status(201);
  }

}) || _class) || _class) || _class);
exports.CreateProductController = CreateProductController;