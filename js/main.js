// TODO: input - check if comma + 2 letters
// TODO: input - check if 5digits/whatever/country code
// TODO: change background
// TODO: style page
// TODO: 


const myKey = '0de22f85bbcdfd474a63ca4a5b2bf32d';

const getData = async () => {
    let cityInput = document.getElementById('city-input').value;
    let response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=${myKey}`);
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
    temp.innerHTML = (Math.round(weatherInfo.main.temp * 10) / 10) + "&deg; F";
    min.innerHTML = (Math.round(weatherInfo.main.temp_min * 10) / 10) + "&deg; F";
    max.innerHTML = (Math.round(weatherInfo.main.temp_max * 10) / 10) + "&deg; F";
    condition.innerHTML = weatherInfo.weather[0].main;
    humidity.innerHTML = weatherInfo.main.humidity + "%";
}

const searchBtn = document.getElementById('search');
searchBtn.addEventListener('click', loadData);

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
            'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];

let date = new Date();
let day = days[date.getDay()];
let month = months[date.getMonth()];
let date_num = date.getDate()

document.getElementById("date").innerHTML = `${day}, ${month} ${date_num}`;