const cargoList = [
    {
        id: "CARGO001",
        name: "Строительные материалы",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24"
    },
    {
        id: "CARGO002",
        name: "Хрупкий груз",
        status: "Доставлен",
        origin: "Санкт-Петербург",
        destination: "Екатеринбург",
        departureDate: "2024-11-26"
    },
    {
        id: "CARGO003",
        name: "Хрупкий груз",
        status: "Ожидает отправки",
        origin: "Москва",
        destination: "Санкт-Петербург",
        departureDate: "2024-11-27"
    }
];

const cargoTableBody = document.getElementById('cargoTableBody');
const statusFilter = document.getElementById('statusFilter');

function renderCargoTable(filterStatus = '') {
    cargoTableBody.innerHTML = '';
    cargoList
        .filter(cargo => !filterStatus || cargo.status === filterStatus)
        .forEach((cargo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${cargo.name}</td>
                <td>
                    <select class="form-select form-select-sm ${cargo.status === 'Ожидает отправки' ? 'status-awaiting' : cargo.status === 'В пути' ? 'status-in-transit' : 'status-delivered'}">
                        <option value="Ожидает отправки" class="status-awaiting" ${cargo.status === 'Ожидает отправки' ? 'selected' : ''}>Ожидает отправки</option>
                        <option value="В пути" class="status-in-transit" ${cargo.status === 'В пути' ? 'selected' : ''}>В пути</option>
                        <option value="Доставлен" class="status-delivered" ${cargo.status === 'Доставлен' ? 'selected' : ''}>Доставлен</option>
                    </select>
                </td>
                <td>${cargo.origin}</td>
                <td>${cargo.destination}</td>
                <td>${cargo.departureDate}</td>
            `;

            const select = row.querySelector('select');
            select.addEventListener('change', function () {
                const today = new Date().toISOString().split('T')[0];
                if (this.value === 'Доставлен' && cargo.departureDate > today) {
                    alert('Нельзя установить статус "Доставлен" для груза с будущей датой отправления.');
                    this.value = cargo.status;
                    return;
                }
                cargo.status = this.value;
                renderCargoTable(filterStatus);
                console.log('status', cargoList)
            });
            cargoTableBody.appendChild(row);
        });
}

document.getElementById('addCargoForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('cargoName').value;
    const origin = document.getElementById('cargoOrigin').value;
    const destination = document.getElementById('cargoDestination').value;
    const date = document.getElementById('cargoDate').value;
    const status = document.getElementById('cargoStatus').value;

    if (!name || !origin || !destination || !date || !status) {
        alert('Пожалуйста, заполните все поля формы.');
        return;
    }

    const newCargo = {
        id: `CARGO${cargoList.length + 1}`,
        name,
        status,
        origin,
        destination,
        departureDate: date
    };

    cargoList.push(newCargo);
    renderCargoTable(statusFilter.value);
    this.reset();
    console.log(cargoList)
});

statusFilter.addEventListener('change', function () {
    renderCargoTable(this.value);
});

renderCargoTable();