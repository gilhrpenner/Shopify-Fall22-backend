"use strict";

var _AppError = require("../../shared/errors/AppError");

var _common = require("../../shared/utils/common.jest");

var _ProductRepository = require("./ProductRepository");

var _WarehouseRepository = require("./WarehouseRepository");

describe('Test product repository in memory', () => {
  let productRepository;
  let warehouseRepository;
  let warehouseLocationOne;
  let warehouseLocationTwo;
  beforeAll(async () => {
    productRepository = new _ProductRepository.ProductRepository();
    warehouseRepository = new _WarehouseRepository.WarehouseRepository();
    warehouseLocationOne = await warehouseRepository.create(_common.firstWarehouse);
    warehouseLocationTwo = await warehouseRepository.create(_common.secondWarehouse);
  }); // this is going to be the first test so I can add 3 products, delete 2 and
  // compare if it deleted as intended, then I delete the last one and all
  // other tests will happen as intended

  it('should delete firstProduct and thirdProduct', async () => {
    await productRepository.create(_common.firstProduct);
    await productRepository.create(_common.secondProduct);
    await productRepository.create(_common.thirdProduct);
    const products = await productRepository.findAll();
    const countProducts = products.length;
    await productRepository.delete([_common.firstProduct.barcode, _common.thirdProduct.barcode]);
    const firstNotFound = await productRepository.findByBarcode(_common.firstProduct.barcode);
    expect(firstNotFound).toBeUndefined();
    const thirdNotFound = await productRepository.findByBarcode(_common.thirdProduct.barcode);
    expect(thirdNotFound).toBeUndefined();
    expect(await productRepository.findAll()).toHaveLength(countProducts - 2);
    await productRepository.delete([_common.secondProduct.barcode]);
  });
  it('should create a product', async () => {
    const product = await productRepository.create(_common.firstProduct);
    expect(product).toBeInstanceOf(Object);
    expect(product.barcode).toBe(_common.firstProduct.barcode);
    expect(product.name).toBe(_common.firstProduct.name);
    expect(product.quantity).toBe(_common.firstProduct.quantity);
    expect(product.location).toBeUndefined();
    const products = await productRepository.findAll();
    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(1);
  });
  it('should update a product quantity', async () => {
    const product = await productRepository.create(_common.secondProduct);
    const updatedProduct = await productRepository.updateQuantity(product.barcode, product.quantity + 500);
    expect(updatedProduct).toBeInstanceOf(Object);
    expect(updatedProduct.quantity).toBe(product.quantity + 500);
  });
  it('should not update a product quantity, product does not exists', async () => {
    await expect(productRepository.updateQuantity('id-does-not-exists', 500)).rejects.toEqual(new _AppError.AppError('Product not found'));
  });
  it('should delete a product', async () => {
    const product = await productRepository.create(_common.thirdProduct);
    const products = await productRepository.findAll();
    const countProducts = products.length;
    await productRepository.delete([product.barcode]);
    const productNotFound = await productRepository.findByBarcode(product.barcode);
    expect(productNotFound).toBeUndefined();
    expect(await productRepository.findAll()).toHaveLength(countProducts - 1);
  });
  it('should not delete a product, product does not exists', async () => {
    const result = await productRepository.delete(['id-does-not-exists']);
    expect(result.productsDeleted).toBe(0);
  });
  it('should assign a location to a product', async () => {
    const productUpdated = await productRepository.assignLocation({
      barcode: _common.firstProduct.barcode,
      location: {
        warehouseId: warehouseLocationOne.id,
        aisle: 5,
        bin: 17
      }
    });
    expect(productUpdated).toBeInstanceOf(Object);
    expect(productUpdated.location).toBeInstanceOf(Object);
    expect(productUpdated.location.warehouseId).toBe(warehouseLocationOne.id);
    expect(productUpdated.location.aisle).toBe(5);
    expect(productUpdated.location.bin).toBe(17);
  });
  it('should not assign a location to a product, product does not exists', async () => {
    await expect(productRepository.assignLocation({
      barcode: 'id-does-not-exists',
      location: {
        warehouseId: warehouseLocationOne.id,
        aisle: 5,
        bin: 17
      }
    })).rejects.toEqual(new _AppError.AppError('Product not found'));
  });
  it('should find a product by barcode', async () => {
    const productFound = await productRepository.findByBarcode(_common.firstProduct.barcode);
    expect(productFound).toBeInstanceOf(Object);
    expect(productFound.barcode).toBe(_common.firstProduct.barcode);
  });
  it('should not find a product by barcode, product does not exists', async () => {
    const product = await productRepository.findByBarcode('123456789');
    expect(product).toBeUndefined();
  });
  it('should find all products', async () => {
    const products = await productRepository.findAll();
    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(2);
  });
  it('should find all products by warehouse', async () => {
    // create a third product just to have different lengths
    await productRepository.create(_common.thirdProduct);
    await productRepository.assignLocation({
      barcode: _common.thirdProduct.barcode,
      location: {
        warehouseId: warehouseLocationTwo.id,
        aisle: 5,
        bin: 17
      }
    }); // second product hasn't been assigned a location, so we do now

    await productRepository.assignLocation({
      barcode: _common.secondProduct.barcode,
      location: {
        warehouseId: warehouseLocationTwo.id,
        aisle: 5,
        bin: 17
      }
    });
    const warehouseOne = await productRepository.findByWarehouseId(warehouseLocationOne.id);
    expect(warehouseOne).toBeInstanceOf(Array);
    expect(warehouseOne).toHaveLength(1);
    const warehouseTwo = await productRepository.findByWarehouseId(warehouseLocationTwo.id);
    expect(warehouseTwo).toBeInstanceOf(Array);
    expect(warehouseTwo).toHaveLength(2);
  });
  it('should find a product by name', async () => {
    const productFound = await productRepository.findByName(_common.firstProduct.name);
    expect(productFound).toBeInstanceOf(Object);
    expect(productFound).toHaveLength(1);
    expect(productFound[0].name).toBe(_common.firstProduct.name);
  });
  it('should not find a product by name, product does not exists', async () => {
    const productsFound = await productRepository.findByName('random name');
    expect(productsFound).toBeInstanceOf(Array);
    expect(productsFound).toHaveLength(0);
  });
  it('should find all products by name', async () => {
    const productsFound = await productRepository.findByName('Old Spice');
    expect(productsFound).toBeInstanceOf(Array);
    expect(productsFound).toHaveLength(2);
  });
  it('should find a product by description', async () => {
    const productFound = await productRepository.findByDescription(_common.firstProduct.description);
    expect(productFound).toBeInstanceOf(Object);
    expect(productFound).toHaveLength(1);
    expect(productFound[0].description).toBe(_common.firstProduct.description);
  });
  it('should update a product', async () => {
    const updatedProduct = await productRepository.update({ ..._common.secondProduct,
      name: 'Updated product',
      description: 'Updated description'
    });
    expect(updatedProduct).toBeInstanceOf(Object);
    expect(updatedProduct.name).toBe('Updated product');
    expect(updatedProduct.description).toBe('Updated description');
  });
  it('should not update a product, product does not exists', async () => {
    await expect(productRepository.update({ ..._common.secondProduct,
      name: 'Updated product',
      description: 'Updated description',
      barcode: 'id-does-not-exists'
    })).rejects.toEqual(new _AppError.AppError('Product not found'));
  });
  it('should unassign locations that were deleted', async () => {
    const warehouseId = warehouseLocationOne.id; // Assign 2 products to the same warehouse

    await productRepository.assignLocation({
      barcode: _common.firstProduct.barcode,
      location: {
        warehouseId,
        aisle: 5,
        bin: 17
      }
    });
    await productRepository.assignLocation({
      barcode: _common.secondProduct.barcode,
      location: {
        warehouseId,
        aisle: 5,
        bin: 17
      }
    });
    const products = await productRepository.findByWarehouseId(warehouseId);
    expect(products).toBeInstanceOf(Array);
    expect(products).toHaveLength(2); // Unassign location of all products in the warehouse

    await productRepository.unassignLocation(warehouseId);
    const productsAfterUnassign = await productRepository.findByWarehouseId(warehouseId);
    expect(productsAfterUnassign).toBeInstanceOf(Array);
    expect(productsAfterUnassign).toHaveLength(0);
  });
});