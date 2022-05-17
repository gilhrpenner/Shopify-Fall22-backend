import { IProductEntity } from '@entities/Product';

export type IUpsertProductRequestDTO = Omit<IProductEntity, 'location'>;

export interface IUpdateProductQuantityRequestDTO {
    barcode: string;
    quantity: number;
}
