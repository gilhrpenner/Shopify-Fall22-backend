import { IWarehouseEntity } from '@entities/Warehouse';
import { ICreateWarehouseRequestDTO } from '@modules/warehouse/warehouseDTO';
import { IWarehouseRepository } from '@repositories/IWarehouseRepository';
import { v4 as uuid } from 'uuid';

export class WarehouseRepository implements IWarehouseRepository {
    private warehouses: IWarehouseEntity[] = [];

    create(warehouse: ICreateWarehouseRequestDTO): Promise<IWarehouseEntity> {
        const newWarehouse: IWarehouseEntity = {
            id: uuid(),
            ...warehouse,
        };

        this.warehouses.push(newWarehouse);
        return Promise.resolve(newWarehouse);
    }

    findById(id: string): Promise<IWarehouseEntity> {
        const warehouse = this.warehouses.find(
            (warehouse) => warehouse.id === id
        );

        return Promise.resolve(warehouse);
    }

    getAll(): Promise<IWarehouseEntity[]> {
        return Promise.resolve(this.warehouses);
    }

    findByName(name: string): Promise<IWarehouseEntity[]> {
        const names = name.toLowerCase().split(' ');
        const warehouses = this.warehouses.filter((warehouse) =>
            names.every((name) => warehouse.name.toLowerCase().includes(name))
        );

        return Promise.resolve(warehouses);
    }

    findByPostalCode(postalCode: string): Promise<IWarehouseEntity[]> {
        const postalCodeCleaned = postalCode
            .replace(/\s/g, '')
            .toLocaleLowerCase();

        const warehouses = this.warehouses.filter(
            (warehouse) =>
                warehouse.address.postalCode
                    .replace(/\s/g, '')
                    .toLocaleLowerCase() === postalCodeCleaned
        );

        return Promise.resolve(warehouses);
    }
}
