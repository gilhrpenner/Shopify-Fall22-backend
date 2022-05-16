import { Router } from 'express';

import { productRoutes } from './product.routes';
import { warehouseRoutes } from './warehouse.routes';

const router = Router();
router.use('/warehouse', warehouseRoutes);
router.use('/product', productRoutes);

export { router };
