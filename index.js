const inputEl = document.getElementById("input");
const temperatureResponse = document.getElementById("temp");
const submitBtn = document.getElementById("submit-btn");
const APIkey = "f77bc1ee443c09b1a77ff9860122fdb8";

submitBtn.addEventListener('click', (event) => {
    event.preventDefault()
    const city = inputEl.value; 
    let lat = null;
    let lon = null;

    if (city) {  
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`)
            .then(response => response.json())
            .then(data => {
                lat = data[0].lat;
                lon = data[0].lon;
                const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`
                return fetch(apiURL);
            })
            .then(response => response.json())
            .then(data => {
                const dataTemp = JSON.stringify(data.main.temp, null, 2);
                temp.textContent = `${(dataTemp -  273.15).toFixed(1)} C`  
            })
            .catch(error => {
                temp.textContent = "An error occurred while fetching the data.";
                console.log(error);
            });
    }
});
