import { createProductController } from '@modules/product/createProduct';
import { updateProductController } from '@modules/product/updateProduct';
import { updateProductQuantityController } from '@modules/product/updateProductQuantity';
import { Router } from 'express';

const productRoutes = Router();

productRoutes.post('/', async (req, res) => {
    return createProductController.handle(req, res);
});

productRoutes.patch('/quantity', async (req, res) => {
    return updateProductQuantityController.handle(req, res);
});

productRoutes.patch('/', async (req, res) => {
    return updateProductController.handle(req, res);
});

export { productRoutes };
