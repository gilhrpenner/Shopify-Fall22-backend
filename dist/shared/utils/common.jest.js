"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thirdWarehouse = exports.thirdProduct = exports.secondWarehouse = exports.secondProduct = exports.fourthProduct = exports.firstWarehouse = exports.firstProduct = exports.fifthProduct = void 0;
const firstWarehouse = {
  name: 'Winnipeg Warehouse and Distribution',
  address: {
    street: '630 Kernaghan Ave',
    city: 'Winnipeg',
    province: 'Manitoba',
    postalCode: 'R2C 5G1'
  },
  aisles: {
    rows: 10,
    binsPerRow: 50
  }
};
exports.firstWarehouse = firstWarehouse;
const secondWarehouse = {
  name: 'Crone Warehouse Sereices',
  address: {
    street: '1830 Dublin Ave',
    city: 'Winnipeg',
    province: 'Manitoba',
    postalCode: 'R3H 0H3'
  },
  aisles: {
    rows: 20,
    binsPerRow: 40
  }
};
exports.secondWarehouse = secondWarehouse;
const thirdWarehouse = {
  name: 'Winnipeg Kitpak Warehouse',
  address: {
    street: '1615 Rd 64 N',
    city: 'Winnipeg',
    province: 'Manitoba',
    postalCode: 'R2X 1R2'
  },
  aisles: {
    rows: 10,
    binsPerRow: 80
  }
};
exports.thirdWarehouse = thirdWarehouse;
const firstProduct = {
  barcode: '1234567890123',
  sku: 'KSRUFTT',
  name: 'Old Spice Arctic Force deodorant',
  // first thing I saw on my table, don't judge me lol
  description: 'Despite the name it does not smell like old spice, it is actually quite good',
  quantity: 10000
};
exports.firstProduct = firstProduct;
const secondProduct = {
  barcode: '1234567890124',
  sku: 'KS944UR',
  name: 'Old Spice Bearglove Anti-perspirante',
  description: 'Lifesaver and actually does the job super well in preventing perspiration',
  quantity: 7000
};
exports.secondProduct = secondProduct;
const thirdProduct = {
  barcode: '1234567890125',
  sku: 'TS15896',
  name: 'Gatorade Zero 28 pack',
  description: 'Zero sugar per bottle, I love the pink flavour',
  quantity: 2500
};
exports.thirdProduct = thirdProduct;
const fourthProduct = {
  barcode: '1234567890126',
  sku: 'WPG15896',
  name: 'Sneakers 52g',
  description: 'I believe to be the best chocolate in the whole world!',
  quantity: 55000
};
exports.fourthProduct = fourthProduct;
const fifthProduct = {
  barcode: '1234567890127',
  sku: 'YYC15896',
  name: 'Scrabble board game',
  description: 'Even the most united families can fight over this game lol',
  quantity: 1000
};
exports.fifthProduct = fifthProduct;