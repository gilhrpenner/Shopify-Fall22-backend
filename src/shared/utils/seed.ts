import { ProductRepository } from '@repositories/in-memory/ProductRepository';
import { WarehouseRepository } from '@repositories/in-memory/WarehouseRepository';

import {
    firstProduct,
    firstWarehouse,
    secondProduct,
    secondWarehouse,
    thirdProduct,
    thirdWarehouse,
    fourthProduct,
    fifthProduct,
} from './common.jest';

export const seedWarehouses = async () => {
    const warehouseRepository = new WarehouseRepository();
    await warehouseRepository.create(firstWarehouse);
    await warehouseRepository.create(secondWarehouse);
    await warehouseRepository.create(thirdWarehouse);
};

export const seedProducts = async () => {
    const productRepository = new ProductRepository();
    await productRepository.create(firstProduct);
    await productRepository.create(secondProduct);
    await productRepository.create(thirdProduct);
    await productRepository.create(fourthProduct);
    await productRepository.create(fifthProduct);
};
