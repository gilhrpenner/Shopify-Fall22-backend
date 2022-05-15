import { createWarehouseController } from '@modules/warehouse/createWarehouse';
import { Router } from 'express';

const warehouseRoutes = Router();

warehouseRoutes.post('/', async (req, res) => {
    return createWarehouseController.handle(req, res);
});

export { warehouseRoutes };
