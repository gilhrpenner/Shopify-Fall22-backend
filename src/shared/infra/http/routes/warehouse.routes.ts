import { createWarehouseController } from '@modules/warehouse/createWarehouse';
import { Router } from 'express';

const warehouseRoutes = Router();

warehouseRoutes.post('/create', async (req, res) => {
    createWarehouseController.handle(req, res);
});

export { warehouseRoutes };
