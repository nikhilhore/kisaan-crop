const stateList = document.querySelector('#state');
const districtList = document.querySelector('#district');
const subDistrictList = document.querySelector('#sub-district');

const submitBtn = document.querySelector('#submit');

fetch('/census').then(async (response) => {

    const censusList = await response.json();

    // Find total states
    const states = new Array();
    censusList.forEach(city => {
        if (!states.includes(city.state)) states.push(city.state);
    });
    states.sort();

    states.forEach(state => {
        const option = document.createElement('option');
        option.innerText = state;
        stateList.appendChild(option);
    });

    // Find and update total districts in given state
    const getDistricts = function () {

        districtList.innerHTML = '<option>Select a district</option>';
        subDistrictList.innerHTML = '<option>Select a sub-district</option>';

        const selectedState = stateList.value;
        if (selectedState === 'Select a state') return;

        const districtsOfState = censusList.filter(city => {
            return city.state === selectedState;
        });

        const districts = new Array();
        districtsOfState.forEach(city => {
            if (!districts.includes(city.district)) districts.push(city.district);
        });
        districts.sort();


        districts.forEach(district => {
            const option = document.createElement('option');
            option.innerText = district;
            districtList.appendChild(option);
        });
    }

    // Find and update total sub-districts in given district
    const getSubDistricts = function () {

        subDistrictList.innerHTML = '<option>Select a sub-district</option>';

        const selectedDistrict = districtList.value;
        if (selectedDistrict === 'Select a district') return;

        const subDistrictsOfDistrict = censusList.filter(city => {
            return city.district === selectedDistrict;
        });

        const subDistricts = new Array();
        subDistrictsOfDistrict.forEach(city => {
            if (!subDistricts.includes(city.sub_district)) subDistricts.push(city.sub_district);
        });
        subDistricts.sort();


        subDistricts.forEach(subDistrict => {
            const option = document.createElement('option');
            option.innerText = subDistrict;
            subDistrictList.appendChild(option);
        });
    }

    stateList.addEventListener('change', getDistricts);
    districtList.addEventListener('change', getSubDistricts);

});