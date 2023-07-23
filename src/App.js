import React, {useState} from "react";
import axios from 'axios';
import humid from './assets/air_FILL0.png'

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3f9aa1a0f7c98bf85adf769f81323aaf&units=metric`;
  

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation("");
    }
  }

  return (
    <div className="app">
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
        </div>


        {data.name !== undefined &&
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> :  null}
            <p className="bold">Feels like</p>
          </div>
        
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> :  null}
            <p className="bold">Humidity</p>
            </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed.toFixed(1)} km/h</p> :  null}
            <img src={humid} />
          </div>

        </div>
}
      </div>
    </div>
  );
}

export default App;
