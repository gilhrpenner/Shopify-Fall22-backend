import { createWarehouseController } from '@modules/warehouse/createWarehouse';
import { updateWarehouseController } from '@modules/warehouse/updateWarehouse';
import { Router } from 'express';

const warehouseRoutes = Router();

warehouseRoutes.post('/', async (req, res) => {
    return createWarehouseController.handle(req, res);
});

warehouseRoutes.put('/:id', async (req, res) => {
    return updateWarehouseController.handle(req, res);
});

export { warehouseRoutes };
