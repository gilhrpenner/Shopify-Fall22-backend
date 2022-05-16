import { IUpsertProductRequestDTO } from '@modules/product/productDTO';
import Joi from 'joi';

export const upsertProductValidation = (
    payload: IUpsertProductRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        barcode: Joi.string().required(),
        sku: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        quantity: Joi.number().required(),
    });

    return schema.validate(payload);
};
