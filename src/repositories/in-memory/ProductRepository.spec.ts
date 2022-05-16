import { Warehouse } from '@entities/Warehouse';
import { IProductRepository } from '@repositories/IProductRepository';
import { IWarehouseRepository } from '@repositories/IWarehouseRepository';

import { AppError } from '@shared/errors/AppError';
import {
    firstProduct,
    firstWarehouse,
    secondProduct,
    secondWarehouse,
    thirdProduct,
} from '@shared/utils/common.jest';

import { ProductRepository } from './ProductRepository';
import { WarehouseRepository } from './WarehouseRepository';

describe('Test product repository in memory', () => {
    let productRepository: IProductRepository;
    let warehouseRepository: IWarehouseRepository;

    let warehouseLocationOne: Warehouse;
    let warehouseLocationTwo: Warehouse;

    beforeAll(async () => {
        productRepository = new ProductRepository();
        warehouseRepository = new WarehouseRepository();

        warehouseLocationOne = await warehouseRepository.create(firstWarehouse);
        warehouseLocationTwo = await warehouseRepository.create(
            secondWarehouse
        );
    });

    it('should create a product', async () => {
        const product = await productRepository.create(firstProduct);

        expect(product).toBeInstanceOf(Object);
        expect(product.barcode).toBe(firstProduct.barcode);
        expect(product.name).toBe(firstProduct.name);
        expect(product.quantity).toBe(firstProduct.quantity);
        expect(product.location).toBeUndefined();

        const products = await productRepository.findAll();
        expect(products).toBeInstanceOf(Array);
        expect(products).toHaveLength(1);
    });

    it('should update a product quantity', async () => {
        const product = await productRepository.create(secondProduct);
        const updatedProduct = await productRepository.updateQuantity(
            product.barcode,
            product.quantity + 500
        );

        expect(updatedProduct).toBeInstanceOf(Object);
        expect(updatedProduct.quantity).toBe(product.quantity + 500);
    });

    it('should not update a product quantity, product does not exists', async () => {
        await expect(
            productRepository.updateQuantity('id-does-not-exists', 500)
        ).rejects.toEqual(new AppError('Product not found'));
    });

    it('should delete a product', async () => {
        const product = await productRepository.create(thirdProduct);

        const products = await productRepository.findAll();
        const countProducts = products.length;

        await productRepository.delete(product.barcode);

        await expect(
            productRepository.findByBarcode(product.barcode)
        ).rejects.toEqual(new AppError('Product not found'));

        expect(await productRepository.findAll()).toHaveLength(
            countProducts - 1
        );
    });

    it('should not delete a product, product does not exists', async () => {
        await expect(
            productRepository.delete('id-does-not-exists')
        ).rejects.toEqual(new AppError('Product not found'));
    });

    it('should assign a location to a product', async () => {
        const productUpdated = await productRepository.assignLocation(
            firstProduct.barcode,
            {
                warehouseId: warehouseLocationOne.id,
                aisle: 5,
                row: 17,
            }
        );

        expect(productUpdated).toBeInstanceOf(Object);
        expect(productUpdated.location).toBeInstanceOf(Object);
        expect(productUpdated.location.warehouseId).toBe(
            warehouseLocationOne.id
        );
        expect(productUpdated.location.aisle).toBe(5);
        expect(productUpdated.location.row).toBe(17);
    });

    it('should not assign a location to a product, product does not exists', async () => {
        await expect(
            productRepository.assignLocation('id-does-not-exists', {
                warehouseId: warehouseLocationOne.id,
                aisle: 5,
                row: 17,
            })
        ).rejects.toEqual(new AppError('Product not found'));
    });

    it('should find a product by barcode', async () => {
        const productFound = await productRepository.findByBarcode(
            firstProduct.barcode
        );

        expect(productFound).toBeInstanceOf(Object);
        expect(productFound.barcode).toBe(firstProduct.barcode);
    });

    it('should not find a product by barcode, product does not exists', async () => {
        await expect(
            productRepository.findByBarcode('id-does-not-exists')
        ).rejects.toEqual(new AppError('Product not found'));
    });

    it('should find all products', async () => {
        const products = await productRepository.findAll();

        expect(products).toBeInstanceOf(Array);
        expect(products).toHaveLength(2);
    });

    it('should find all products by warehouse', async () => {
        // create a third product just to have different lengths
        await productRepository.create(thirdProduct);
        await productRepository.assignLocation(thirdProduct.barcode, {
            warehouseId: warehouseLocationTwo.id,
            aisle: 5,
            row: 17,
        });

        // second product hasn't been assigned a location, so we do now
        await productRepository.assignLocation(secondProduct.barcode, {
            warehouseId: warehouseLocationTwo.id,
            aisle: 5,
            row: 17,
        });

        const warehouseOne = await productRepository.findByWarehouseId(
            warehouseLocationOne.id
        );

        expect(warehouseOne).toBeInstanceOf(Array);
        expect(warehouseOne).toHaveLength(1);

        const warehouseTwo = await productRepository.findByWarehouseId(
            warehouseLocationTwo.id
        );

        expect(warehouseTwo).toBeInstanceOf(Array);
        expect(warehouseTwo).toHaveLength(2);
    });

    it('should find a product by name', async () => {
        const productFound = await productRepository.findByName(
            firstProduct.name
        );

        expect(productFound).toBeInstanceOf(Object);
        expect(productFound).toHaveLength(1);
        expect(productFound[0].name).toBe(firstProduct.name);
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
        const productFound = await productRepository.findByDescription(
            firstProduct.description
        );

        expect(productFound).toBeInstanceOf(Object);
        expect(productFound).toHaveLength(1);
        expect(productFound[0].description).toBe(firstProduct.description);
    });
});
