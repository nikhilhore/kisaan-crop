const dunsElement = document.querySelector('#duns');
const aadharElement = document.querySelector('#aadhar');

const idElement = dunsElement || aadharElement;

function validSelection(state, district, subDistrict) {
    return state !== 'Select a state' && district !== 'Select a district' && subDistrict !== 'Select a sub-district';
}

function validId(id, idLength) {
    return id.length === idLength;
}

function validQuantities(quantities, maxLimit) {
    for (let i = 0; i < 6; i++) {
        if (isNaN(quantities[i]) || quantities[i] < 0 || quantities[i] > maxLimit) return false;
    }
    return true;
}

async function handleSubmit() {
    const state = stateList.value;
    const district = districtList.value;
    const subDistrict = subDistrictList.value;

    const isValidSelection = validSelection(state, district, subDistrict);
    if (!isValidSelection) return;

    let idLength = 12;
    let maxLimit = 1000;
    if (idElement == dunsElement) {
        idLength = 9;
        maxLimit = 10000;
    }
    const isValidId = validId(idElement.value, idLength);
    if (!isValidId) return;

    const id = parseInt(idElement.value);
    const cotton = parseInt(document.querySelector('#cotton').value);
    const sugarcane = parseInt(document.querySelector('#sugarcane').value);
    const jowar = parseInt(document.querySelector('#jowar').value);
    const wheat = parseInt(document.querySelector('#wheat').value);
    const turmeric = parseInt(document.querySelector('#turmeric').value);
    const soyabean = parseInt(document.querySelector('#soyabean').value);

    const isValidQuantity = validQuantities([cotton, sugarcane, jowar, wheat, turmeric, soyabean], maxLimit);
    if (!isValidQuantity) return;

    const payload = { state, district, subDistrict, id, cotton, sugarcane, jowar, wheat, turmeric, soyabean };
    let postRoute = '/supply';
    if (idElement == dunsElement) postRoute = '/demand';

    const response = await axios.post(postRoute, payload);
    console.log(response);
}

submitBtn.addEventListener('click', handleSubmit);