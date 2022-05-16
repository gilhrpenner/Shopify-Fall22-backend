import { createProductController } from '@modules/product/createProduct';
import { Router } from 'express';

const productRoutes = Router();

productRoutes.post('/', async (req, res) => {
    return createProductController.handle(req, res);
});

export { productRoutes };
