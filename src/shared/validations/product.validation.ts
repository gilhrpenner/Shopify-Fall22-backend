import {
    IUpsertProductRequestDTO,
    IUpdateProductQuantityRequestDTO,
    IDeleteProductRequestDTO,
} from '@modules/product/productDTO';
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

export const updateProductQuantityValidation = (
    payload: IUpdateProductQuantityRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        barcode: Joi.string().required(),
        quantity: Joi.number().required(),
    });

    return schema.validate(payload);
};

export const deleteProductValidation = (
    payload: IDeleteProductRequestDTO
): Joi.ValidationResult => {
    const schema = Joi.object({
        barcodes: Joi.array().items(Joi.string()).required(),
    });

    return schema.validate(payload);
};
