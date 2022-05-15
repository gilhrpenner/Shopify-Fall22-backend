import { Warehouse } from '@entities/Warehouse';
import { IUpsertWarehouseRequestDTO } from '@modules/warehouse/warehouseDTO';

export interface IWarehouseRepository {
    create(warehouse: IUpsertWarehouseRequestDTO): Promise<Warehouse>;
    update(
        id: string,
        warehouseData: IUpsertWarehouseRequestDTO
    ): Promise<Warehouse>;

    findById(id: string): Promise<Warehouse>;
    getAll(): Promise<Warehouse[]>;
    findByName(name: string): Promise<Warehouse[]>;
    findByPostalCode(postalCode: string): Promise<Warehouse[]>;
}
