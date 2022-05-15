import 'reflect-metadata';
import { IWarehouseRepository } from '@repositories/IWarehouseRepository';

import { WarehouseRepository } from './WarehouseRepository';

const firstWarehouse = {
    name: 'Winnipeg Warehouse and Distribution',
    address: {
        street: '630 Kernaghan Ave',
        city: 'Winnipeg',
        province: 'Manitoba',
        postalCode: 'R2C 5G1',
    },
    aisles: {
        rows: 10,
        binsPerRow: 50,
    },
};

const secondWarehouse = {
    name: 'Crone Warehouse Sereices',
    address: {
        street: '1830 Dublin Ave',
        city: 'Winnipeg',
        province: 'Manitoba',
        postalCode: 'R3H 0H3',
    },
    aisles: {
        rows: 20,
        binsPerRow: 40,
    },
};

const thirdWarehouse = {
    name: 'Winnipeg Kitpak Warehouse',
    address: {
        street: '1615 Rd 64 N',
        city: 'Winnipeg',
        province: 'Manitoba',
        postalCode: 'R2X 1R2',
    },
    aisles: {
        rows: 10,
        binsPerRow: 80,
    },
};

describe('Test warehouse repository in memory', () => {
    let warehouseRepository: IWarehouseRepository;

    beforeAll(() => {
        warehouseRepository = new WarehouseRepository();
    });

    it('should create a warehouse', async () => {
        const warehouse = await warehouseRepository.create(firstWarehouse);

        expect(warehouse).toBeInstanceOf(Object);
        expect(warehouse).toHaveProperty('id');
        expect(warehouse.name).toBe(firstWarehouse.name);
        expect(warehouse.address.street).toBe(firstWarehouse.address.street);
    });

    it('should find a warehouse by id', async () => {
        const warehouse = await warehouseRepository.create(secondWarehouse);
        const warehouseFound = await warehouseRepository.findById(warehouse.id);

        expect(warehouseFound).toEqual(warehouse);
    });

    it('should not find the warehouse by id, id does not exists', async () => {
        const found = await warehouseRepository.findById('id-does-not-exists');
        expect(found).toBeUndefined();
    });

    it('should get all warehouses', async () => {
        const warehouses = await warehouseRepository.getAll();

        expect(warehouses).toBeInstanceOf(Array);
        expect(warehouses).toHaveLength(2);
    });

    it('should find a warehouse by name', async () => {
        const warehouse = await warehouseRepository.create(thirdWarehouse);
        const warehouseFound = await warehouseRepository.findByName(
            warehouse.name
        );

        expect(warehouseFound).toBeInstanceOf(Array);
        expect(warehouseFound).toHaveLength(1);
        expect(warehouseFound[0]).toEqual(warehouse);
    });

    it('should find all warehouses that has "Warehouse" in the name', async () => {
        const warehouses = await warehouseRepository.findByName('Warehouse');

        expect(warehouses).toBeInstanceOf(Array);
        expect(warehouses).toHaveLength(3);
    });

    it('should not find any warehouse by name, name does not exists', async () => {
        const warehouses = await warehouseRepository.findByName('Any name');

        expect(warehouses).toBeInstanceOf(Array);
        expect(warehouses).toHaveLength(0);
    });

    it('should find a warehouse by postal code', async () => {
        const warehouseFound = await warehouseRepository.findByPostalCode(
            'R2C5G1'
        );

        expect(warehouseFound).toBeInstanceOf(Array);
        expect(warehouseFound).toHaveLength(1);
    });
});
