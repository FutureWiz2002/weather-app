import React, {useState} from "react";
import axios from 'axios';
import wind from './assets/Wind.svg'
import humid from './assets/Moist.svg'
import feels_like from './assets/Feelslike.svg'
import Clouds from './assets/Clouds.svg'
import Rain from './assets/Rain.svg'
import Snow from './assets/Snow.svg'
import Light from './assets/Light.svg'
import Haze from './assets/Haze2.svg'
import Sun from './assets/Sun.svg'


// import WEATHER_API from './.env.local'
// document.body.style.backgroundColor = "red";

function App() {
  const apikeys = process.env.REACT_APP_WEATHER_API
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [weatherCondition, setWeatherCondition] = useState(null);
  
  // color palette clear 
  // Clear - 5DBBE1
  // Rain - 657268 
  // Thunder - 657268 
  // Snow - 5DBBE1
  // mist, Haze - CDD8D9
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikeys}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      axios.get(url).then((response) => {
        setData(response.data)
        setWeatherCondition(response.data.weather[0].main)
        setCountry(response.data.sys.country)
        console.log(response.data)
      })
      setLocation("");
      console.log(weatherCondition)
    }
  }
  
  
  const weatherImages = {
    Clouds: Clouds,
    Rain: Rain,
    Snow: Snow,
    Thunderstorm: Light,
    Haze: Haze,
    Mist: Haze,
    Clear: Sun,
  }; // this contains the data and using this dictionary will replace the data from the url and call the image respectively. See line 87

  const colour = {
    Clouds: '#9C928F',
    Rain: '#9C928F',
    Snow: '#9C928F',
    Thunderstorm: '#9C928F',
    Haze: '#8EAFB3',
    Mist: '#8EAFB3',
    Clear: '#5DBBE1',
  } // Similar to previous comment, receives the data from the url/api and changes the background color with it. See line 68
  

  return (
    <div className="app" style={{ backgroundColor: colour[weatherCondition]}}>
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}        
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location"><p className="bold">{data.name}, {country}</p></div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="desc">
            {data.weather ? <p className="bold">{data.weather[0].main}</p> : null}
          </div>
          <div className="weather-image">
            <img src={weatherImages[weatherCondition]} alt={weatherCondition} style={{ width: '60px', height: '60px' }}
 />  
          </div>
        </div>


        {data.name !== undefined && // This && section is an if statement, without the else part (single condition).
        <div className="bottom">
          <div className="feels">
            <img src={feels_like}  style={{ width: '30px', height: '30px' }}/>
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> :  null}
          </div>
        
          <div className="humidity">
            <img src={humid}  style={{ width: '30px', height: '30px' }}/>
            {data.main ? <p className="bold">{data.main.humidity}%</p> :  null}
            </div>
          <div className="wind">
            <img src={wind}  style={{ width: '30px', height: '30px' }}/>
            {data.wind ? <p className="bold">{data.wind.speed.toFixed(1)} km/h</p> :  null}
          </div>

        </div>
}
      </div>
    </div>
  );
}

export default App;
