import { IProductEntity } from '@entities/Product';

export type ICreateProductRequestDTO = Omit<IProductEntity, 'location'>;

export interface IUpdateProductQuantityRequestDTO {
    barcode: string;
    quantity: number;
}
