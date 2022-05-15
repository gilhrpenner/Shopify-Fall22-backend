import { IWarehouseEntity, Warehouse } from '@entities/Warehouse';
import { IUpsertWarehouseRequestDTO } from '@modules/warehouse/warehouseDTO';
import { IWarehouseRepository } from '@repositories/IWarehouseRepository';
import { v4 as uuid } from 'uuid';

import { AppError } from '@shared/errors/AppError';

const memoryWarehouses: IWarehouseEntity[] = [];
export class WarehouseRepository implements IWarehouseRepository {
    create(warehouse: IUpsertWarehouseRequestDTO): Promise<Warehouse> {
        const newWarehouse: IWarehouseEntity = {
            id: uuid(),
            ...warehouse,
        };

        memoryWarehouses.push(newWarehouse);
        return Promise.resolve(newWarehouse);
    }

    update(
        id: string,
        warehouseData: IUpsertWarehouseRequestDTO
    ): Promise<Warehouse> {
        const warehouseIndex = memoryWarehouses.findIndex(
            (warehouse) => warehouse.id === id
        );

        if (warehouseIndex === -1) {
            return Promise.reject(new AppError('Warehouse not found', 400));
        }

        memoryWarehouses[warehouseIndex] = {
            ...memoryWarehouses[warehouseIndex],
            ...warehouseData,
        };

        return Promise.resolve(memoryWarehouses[warehouseIndex]);
    }

    findById(id: string): Promise<Warehouse> {
        const warehouse = memoryWarehouses.find(
            (warehouse) => warehouse.id === id
        );

        return Promise.resolve(warehouse);
    }

    getAll(): Promise<Warehouse[]> {
        return Promise.resolve(memoryWarehouses);
    }

    findByName(name: string): Promise<Warehouse[]> {
        const names = name.toLowerCase().split(' ');
        const warehouses = memoryWarehouses.filter((warehouse) =>
            names.every((name) => warehouse.name.toLowerCase().includes(name))
        );

        return Promise.resolve(warehouses);
    }

    findByPostalCode(postalCode: string): Promise<Warehouse[]> {
        const postalCodeCleaned = postalCode
            .replace(/\s/g, '')
            .toLocaleLowerCase();

        const warehouses = memoryWarehouses.filter(
            (warehouse) =>
                warehouse.address.postalCode
                    .replace(/\s/g, '')
                    .toLocaleLowerCase() === postalCodeCleaned
        );

        return Promise.resolve(warehouses);
    }
}
