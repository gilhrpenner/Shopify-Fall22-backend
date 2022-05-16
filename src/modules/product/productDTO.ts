import { IProductEntity } from '@entities/Product';

export type IUpsertProductRequestDTO = Omit<IProductEntity, 'location'>;
