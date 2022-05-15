interface IWarehouseAddress {
    street: string;
    city: string;
    province: string;
    postalCode: string;
}

interface IWarehouseAisles {
    rows: number;
    binsPerRow: number;
}

export interface IWarehouseEntity {
    id: string;
    name: string;
    address: IWarehouseAddress;
    aisles: IWarehouseAisles;
}

export class Warehouse implements IWarehouseEntity {
    id: string;
    name: string;
    address: IWarehouseAddress;
    aisles: IWarehouseAisles;

    constructor(warehouse: IWarehouseEntity) {
        Object.assign(this, warehouse);
    }

    static create(warehouse: IWarehouseEntity): Warehouse {
        return new Warehouse(warehouse);
    }
}
