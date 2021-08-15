// TODO: input - check if comma + 2 letters

document.getElementById('card').style.display = 'none';

// Display today's date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
            'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

let date = new Date();
let day = days[date.getDay()];
let month = months[date.getMonth()];
let date_num = date.getDate()

document.getElementById("date").innerHTML = `${day}, ${month} ${date_num}`;

// API
const myKey = '0de22f85bbcdfd474a63ca4a5b2bf32d';

const getData = async () => {
    let cityInput = document.getElementById('city-input').value;
    if (!isNaN(cityInput)) {
        var response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?zip=${cityInput},us&units=imperial&appid=${myKey}`
        )
    } else {
        var response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${myKey}`);
    }
    let data = response.data;
    console.log(data)
    return data
}

const temp = document.getElementById('temp');
const min = document.getElementById('min');
const max = document.getElementById('max');
const condition = document.getElementById('condition');
const humidity = document.getElementById('humidity');



const loadData = async (event) => {
    event.preventDefault();
    const weatherInfo = await getData();
    document.getElementById('card').style.display = '';
    temp.innerHTML = (Math.round(weatherInfo.main.temp * 10) / 10) + "&deg; F";
    min.innerHTML = (Math.round(weatherInfo.main.temp_min * 10) / 10) + "&deg; F";
    max.innerHTML = (Math.round(weatherInfo.main.temp_max * 10) / 10) + "&deg; F";
    condition.innerHTML = weatherInfo.weather[0].main;
    humidity.innerHTML = weatherInfo.main.humidity + "%";

    const conditionID = weatherInfo.weather[0].id;
    console.log(conditionID)
    if (conditionID >= 200 && conditionID < 300) {
        document.querySelector('body').style.backgroundImage = 'url(../images/lightning.jpg)';
    } else if (conditionID >= 300 && conditionID < 600) {
        document.querySelector('body').style.backgroundImage = 'url(../images/rain.jpg)';
    } else if (conditionID >= 600 && conditionID < 700) {
        document.querySelector('body').style.backgroundImage = 'url(../images/snow.jpg)';
    } else if (conditionID == 800) {
        document.querySelector('body').style.background = 'linear-gradient(0deg, rgba(34,89,195,1) 0%, rgba(117,217,255,1) 100%)';
    } else if (conditionID > 700 && conditionID != 800) {
        document.querySelector('body').style.backgroundImage = 'url(../images/clouds.jpg)';
    }
}

const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', loadData);