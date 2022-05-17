import { IProductEntity, IProductLocation } from '@entities/Product';

export type IUpsertProductRequestDTO = Omit<IProductEntity, 'location'>;

export interface IUpdateProductQuantityRequestDTO {
    barcode: string;
    quantity: number;
}

export interface IDeleteProductRequestDTO {
    barcodes: string[];
}

export interface IDeletedProductDTO {
    productsDeleted: number;
}

export interface IAssignWarehouseRequestDTO {
    barcode: string;
    location: IProductLocation;
}
