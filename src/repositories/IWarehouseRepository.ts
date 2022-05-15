import { IWarehouseEntity, Warehouse } from '@entities/Warehouse';
import { ICreateWarehouseRequestDTO } from '@modules/warehouse/warehouseDTO';

export interface IWarehouseRepository {
    create(warehouse: ICreateWarehouseRequestDTO): Promise<Warehouse>;
    findById(id: string): Promise<IWarehouseEntity>;
    getAll(): Promise<IWarehouseEntity[]>;
    findByName(name: string): Promise<IWarehouseEntity[]>;
    findByPostalCode(postalCode: string): Promise<IWarehouseEntity[]>;
}
