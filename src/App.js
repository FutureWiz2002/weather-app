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
document.body.style.backgroundColor = "red";

function App() {
  const apikeys = process.env.REACT_APP_WEATHER_API
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  
  //color palette
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikeys}&units=metric`;
  

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      axios.get(url).then((response) => {
        setData(response.data)
        setWeatherCondition(response.data.weather[0].main)
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
    Light: Light,
    Haze: Haze,
    Mist: Haze,
    Clear: Sun,
  };
  

  return (
    <div className="app" style={{ backgroundColor: backgroundColor}}>
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
          <div className="location"><p className="bold">{data.name}</p></div>
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


        {data.name !== undefined &&
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
