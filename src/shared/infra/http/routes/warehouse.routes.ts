import { createWarehouseController } from '@modules/warehouse/createWarehouse';
import { deleteWarehouseController } from '@modules/warehouse/deleteWarehouse';
import { updateWarehouseController } from '@modules/warehouse/updateWarehouse';
import { Router } from 'express';

const warehouseRoutes = Router();

warehouseRoutes.post('/', async (req, res) => {
    return createWarehouseController.handle(req, res);
});

warehouseRoutes.put('/:id', async (req, res) => {
    return updateWarehouseController.handle(req, res);
});

warehouseRoutes.delete('/:id', async (req, res) => {
    return deleteWarehouseController.handle(req, res);
});

export { warehouseRoutes };
