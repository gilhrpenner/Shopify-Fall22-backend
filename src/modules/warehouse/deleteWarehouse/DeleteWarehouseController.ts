import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

import { DeleteWarehouseService } from './DeleteWarehouseService';

@autoInjectable()
export class DeleteWarehouseController {
    constructor(private deleteWarehouseService: DeleteWarehouseService) {}

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        await this.deleteWarehouseService.execute(id);

        return res.sendStatus(200);
    }
}