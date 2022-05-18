/* eslint-disable no-undef */
/* eslint-disable func-names */
function showErrorToast(message) {
    const errorToast = document.getElementById('errorToast');
    // eslint-disable-next-line no-undef
    const toast = new bootstrap.Toast(errorToast);
    toast.show();

    document.getElementById('errorToastBody').innerHTML = message;
}

async function apiRequest(url, method, data) {
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    return {
        response: await response.json(),
        status: response.status,
    };
}

// Open warehouse modal
const openWarehouseModalBtns = document.querySelectorAll(
    'button[name="openWarehouseModal"]'
);
openWarehouseModalBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        const type = btn.getAttribute('data-toggle');
        const myModal = new bootstrap.Modal(
            document.getElementById('warehouseModal')
        );

        if (type === 'create') {
            document.getElementById('warehouseModalLabel').innerHTML =
                'Create new warehouse';

            document.getElementById('createWarehouseButton').style.display =
                'block';
            document.getElementById('editWarehouseButton').style.display =
                'none';

            document.getElementById('warehouseNameField').value = '';
            document.getElementById('warehouseStreetField').value = '';
            document.getElementById('warehouseCityField').value = '';
            document.getElementById('warehousePostalCodeField').value = '';
            document.getElementById('warehouseAisleField').value = '';
            document.getElementById('warehouseBinField').value = '';
        } else {
            document.getElementById('warehouseModalLabel').innerHTML =
                'Edit warehouse';

            document.getElementById('createWarehouseButton').style.display =
                'none';
            document.getElementById('editWarehouseButton').style.display =
                'block';

            const data = JSON.parse(btn.getAttribute('warehouse-data'));
            document.getElementById('warehouseNameField').value = data.name;
            document.getElementById('warehouseStreetField').value =
                data.address.street;
            document.getElementById('warehouseCityField').value =
                data.address.city;
            document.getElementById('warehousePostalCodeField').value =
                data.address.postalCode;
            document.getElementById('warehouseAisleField').value =
                data.aisles.rows;
            document.getElementById('warehouseBinField').value =
                data.aisles.binsPerRow;

            document
                .getElementById('editWarehouseButton')
                .setAttribute('warehouse-id', data.id);
        }

        myModal.show();
    });
});

// Edit warehouse event
const editWarehouseBtn = document.getElementById('editWarehouseButton');
editWarehouseBtn.addEventListener('click', async function () {
    const warehouseId = editWarehouseBtn.getAttribute('warehouse-id');
    const result = await apiRequest(`/warehouse/${warehouseId}`, 'PUT', {
        name: document.getElementById('warehouseNameField').value,
        address: {
            street: document.getElementById('warehouseStreetField').value,
            city: document.getElementById('warehouseCityField').value,
            province: document.getElementById('warehouseProvinceField').value,
            postalCode: document.getElementById('warehousePostalCodeField')
                .value,
        },
        aisles: {
            rows: document.getElementById('warehouseAisleField').value,
            binsPerRow: document.getElementById('warehouseBinField').value,
        },
    });

    if (result.status === 200) {
        window.location.reload();
    } else {
        showErrorToast(result.response.message);
    }
});

// Create new warehouse event
const createWarehouseBtn = document.getElementById('createWarehouseButton');
createWarehouseBtn.addEventListener('click', async function () {
    const result = await apiRequest('/warehouse/', 'POST', {
        name: document.getElementById('warehouseNameField').value,
        address: {
            street: document.getElementById('warehouseStreetField').value,
            city: document.getElementById('warehouseCityField').value,
            province: document.getElementById('warehouseProvinceField').value,
            postalCode: document.getElementById('warehousePostalCodeField')
                .value,
        },
        aisles: {
            rows: document.getElementById('warehouseAisleField').value,
            binsPerRow: document.getElementById('warehouseBinField').value,
        },
    });

    if (result.status === 200) {
        window.location.reload();
    } else {
        showErrorToast(result.response.message);
    }
});

// Delete warehouse event
const deleteWarehouseBtn = document.getElementsByName('deleteWarehouseButton');
deleteWarehouseBtn.forEach((btn) => {
    btn.addEventListener('click', async function () {
        const warehouseId = btn.getAttribute('warehouse-id');
        await apiRequest(`/warehouse/${warehouseId}`, 'DELETE');

        window.location.reload();
    });
});
