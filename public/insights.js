function createTable(demands, supplies) {
    const crops = ['Cotton', 'Sugarcane', 'Jowar', 'Wheat', 'Turmeric', 'Soyabean'];
    const props = ['cotton', 'sugarcane', 'jowar', 'wheat', 'turmeric', 'soyabean'];

    const tableHead = document.createElement('thead');
    tableHead.innerHTML = '<tr><th>Crop</th><th>Demand</th><th>Supply</th></tr>';

    const tableBody = document.createElement('tbody');
    for (let i = 0; i < 6; i++) {
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `<td>${crops[i]}</td>
        <td>${demands[props[i]]}</td>
        <td>${supplies[props[i]]}</td>`;
        tableBody.appendChild(tableRow);
    }

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'mt-4');
    table.appendChild(tableHead);
    table.appendChild(tableBody);

    const tableContainer = document.querySelector('#table-container');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

async function getCropData() {
    const payload = {
        state: stateList.value,
        district: districtList.value,
        subDistrict: subDistrictList.value
    }
    const result = (await axios.post('/insights', payload)).data;
    const demands = result.demands;
    const supplies = result.supplies;

    createTable(demands, supplies);
}

submitBtn.addEventListener('click', getCropData);