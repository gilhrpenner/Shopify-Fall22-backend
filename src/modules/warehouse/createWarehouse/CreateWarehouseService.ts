import { autoInjectable } from 'tsyringe';

import { ICreateWarehouseRequestDTO } from '../warehouseDTO';

@autoInjectable()
export class CreateWarehouseService {
    constructor() {
        //
    }

    async execute(payload: ICreateWarehouseRequestDTO): Promise<void> {
        console.log(payload);
    }
}
