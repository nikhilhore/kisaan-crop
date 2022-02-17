const stateList = document.querySelector('#state');
const districtList = document.querySelector('#district');
const subDistrictList = document.querySelector('#sub-district');
const submitBtn = document.querySelector('#submit');

(async function getStates() {
    const states = (await axios.get('/states')).data;

    states.forEach(state => {
        const option = document.createElement('option');
        option.innerText = state;
        stateList.appendChild(option);
    });
}());

async function getDistricts() {
    const payload = { state: stateList.value };
    const districts = (await axios.post('/districts', payload)).data;

    districtList.innerHTML = '<option>Select a district</option>';
    subDistrictList.innerHTML = '<option>Select a sub-district</option>';

    districts.forEach(district => {
        const option = document.createElement('option');
        option.innerText = district;
        districtList.appendChild(option);
    });
}

async function getSubDistricts() {
    const payload = { state: stateList.value, district: districtList.value };
    const subDistricts = (await axios.post('/subDistricts', payload)).data;

    subDistrictList.innerHTML = '<option>Select a sub-district</option>';

    subDistricts.forEach(subDistrict => {
        const option = document.createElement('option');
        option.innerText = subDistrict;
        subDistrictList.appendChild(option);
    });
}

stateList.addEventListener('change', getDistricts);
districtList.addEventListener('change', getSubDistricts);