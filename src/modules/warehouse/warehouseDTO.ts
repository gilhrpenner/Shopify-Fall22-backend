import { IWarehouseEntity } from '@entities/Warehouse';

export type ICreateWarehouseRequestDTO = Omit<IWarehouseEntity, 'id'>;
