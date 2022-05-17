import { IProductLocation, Product } from '@entities/Product';
import { ICreateProductRequestDTO } from '@modules/product/productDTO';
import { IProductRepository } from '@repositories/IProductRepository';

import { AppError } from '@shared/errors/AppError';

const memoryProducts: Product[] = [];

export class ProductRepository implements IProductRepository {
    private findProductIndex(barcode: string): number {
        return memoryProducts.findIndex(
            (product) => product.barcode === barcode
        );
    }

    create(product: ICreateProductRequestDTO): Promise<Product> {
        const newProduct: Product = {
            ...product,
            location: undefined,
        };

        memoryProducts.push(newProduct);
        return Promise.resolve(newProduct);
    }

    updateQuantity(barcode: string, quantity: number): Promise<Product> {
        const productIndex = this.findProductIndex(barcode);
        if (productIndex === -1) {
            return Promise.reject(new AppError('Product not found'));
        }

        memoryProducts[productIndex] = {
            ...memoryProducts[productIndex],
            quantity,
        };

        return Promise.resolve(memoryProducts[productIndex]);
    }

    delete(barcode: string): Promise<void> {
        const productIndex = this.findProductIndex(barcode);
        if (productIndex === -1) {
            return Promise.reject(new AppError('Product not found'));
        }

        memoryProducts.splice(productIndex, 1);

        return Promise.resolve();
    }

    assignLocation(
        barcode: string,
        location: IProductLocation
    ): Promise<Product> {
        const productIndex = this.findProductIndex(barcode);
        if (productIndex === -1) {
            return Promise.reject(new AppError('Product not found'));
        }

        memoryProducts[productIndex] = {
            ...memoryProducts[productIndex],
            location,
        };

        return Promise.resolve(memoryProducts[productIndex]);
    }

    findByBarcode(barcode: string): Promise<Product> {
        const productIndex = this.findProductIndex(barcode);

        return Promise.resolve(memoryProducts[productIndex]);
    }

    findAll(): Promise<Product[]> {
        return Promise.resolve(memoryProducts);
    }

    findByName(name: string): Promise<Product[]> {
        const names = name.toLocaleLowerCase().split(' ');
        const products = memoryProducts.filter((product) => {
            return names.every((name) =>
                product.name.toLocaleLowerCase().includes(name)
            );
        });

        return Promise.resolve(products);
    }

    findByDescription(description: string): Promise<Product[]> {
        const descriptions = description.toLocaleLowerCase().split(' ');
        const products = memoryProducts.filter((product) => {
            return descriptions.every((description) =>
                product.description.toLocaleLowerCase().includes(description)
            );
        });

        return Promise.resolve(products);
    }

    findByWarehouseId(warehouseId: string): Promise<Product[]> {
        const products = memoryProducts.filter(
            (product) => product.location.warehouseId === warehouseId
        );

        return Promise.resolve(products);
    }
}
