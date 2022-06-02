const api = {
    key: '169257ac30ede61e7544309220216e0a',
    base: "https://api.openweathermap.org/data/2.5/"
} // figure out how to hide this later... why doesnt require dotenv work

const searchbox = document.querySelector('.search-box');
const switchBackground = document.querySelector('.switchBtnBg');
const switchTemp = document.querySelector('.switchBtnTemp')



switchBackground.addEventListener('click', (e) => {
    if (switchBackground.checked == true){
        document.body.style.backgroundImage = 'url(bg2.jpg)'
    } else {
        document.body.style.backgroundImage = 'url(bg.jpg)'
    }
});





searchbox.addEventListener('keypress', search);

function search(e) {
    if (e.keyCode == 13) {
    getResults(searchbox.value);
    
    }
}

function getResults(searchbox) {
    fetch(`${api.base}weather?q=${searchbox}&units=imperial&APPID=${api.key}`)
    .then(weather => weather.json())
    .then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].description;

    let weatherI = document.querySelector('.weatherI');
    const {icon} = weather.weather[0];
    let image = document.createElement('img')
    image.src =`icons/${icon}.png`;
    
    if (weatherI.firstChild){
        weatherI.removeChild(weatherI.firstChild)
    }
    weatherI.appendChild(image)

    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;

    let celsius = Math.round((Math.round(weather.main.temp) -32) * 5/9);
    let celsiusHiLo = Math.round((Math.round(weather.main.temp_min)-32) * 5/9) + '°C / ' + Math.round((Math.round(weather.main.temp_max) -32) *5/9) + ' °C';

    

    switchTemp.addEventListener('click', (e) =>{
        if(switchTemp.checked == true){
            temp.innerHTML = `${celsius}<span>°C</span>`
            hilow.innerText = celsiusHiLo;
        } else {
            temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`
            hilow.innerText = `${Math.round(weather.main.temp_min)}°F / ${Math.round(weather.main.temp_max)}°F`;
        }
    })
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
};