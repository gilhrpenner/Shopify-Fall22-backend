import { Router } from 'express';

import { warehouseRoutes } from './warehouse.routes';

const router = Router();
router.use('/warehouse', warehouseRoutes);

export { router };
