import { useEffect, useState } from 'react';
import './App.css';
import PropTypes from "prop-types";

import searchIcon from './Assets/search.png';
import clearIcon from './Assets/clear.png';
import cloudIcon from './Assets/cloud.png';
import drizzleIcon from './Assets/drizzle.png';
import humidityIcon from './Assets/humidity.png';
import rainIcon from './Assets/rain.png';
import snowIcon from './Assets/snow.png';
import windIcon from './Assets/wind.png';

const WeatherDetails=({icon,temp,city,country,lat,long,humidity,wind})=>{
  return(
    <>
    <div className='image'>
      <img src={icon} alt="Img" className='img'/>

    </div>
    <div className='temp'>{temp}°C </div>
    <div className="location">{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'>
      <div>
          <span className='lat'>latitude</span>
          <span>{lat}</span>
      </div>
      <div>
          <span className='long'>longitude</span>
          <span>{lat}</span>
      </div>
    </div>
    <div className='data-container'>
      <div className='element'>
        <img src={humidityIcon} alt="humidity" className='icon'/>
        <div className='data'>
          <div className='humidity-percent'>{humidity}%</div>
          <div className='text'>Humidity</div>
        </div>
        </div>
        <div className='element'>
        <img src={windIcon} alt="wind" className='icon'/>
        <div className='data'>
          <div className='wind-percent'>{wind} km/h</div>
          <div className='text'>Wind Speed</div>
        </div>
      </div>
      
    </div>
    
    
    </>
  )
}

WeatherDetails.propTypes={
  icon:PropTypes.string.isRequired,
  temp:PropTypes.number.isRequired,
  city:PropTypes.string.isRequired,
  country:PropTypes.string.isRequired,
  lat:PropTypes.number.isRequired,
  long:PropTypes.number.isRequired,
  humidity:PropTypes.number.isRequired,
  wind:PropTypes.number.isRequired,
}

function App() {

  const [text,setText]=useState("Chennai");
  const [icon,setIcon]=useState(rainIcon);
  const [temp,setTemp]=useState(0);
  const [city,setCity]=useState("Salem");
  const [country,setCountry]=useState("IN");
  const [lat,setLat]=useState(0);
  const [long,setLong]=useState(0);
  const [humidity,setHumidity]=useState(0);
  const [wind,setWind]=useState(0);
  const apiKey="d3d61554e7ee26bb8a87007a6cb20c82";
  const [loading,setLoading]=useState(false);
  const [cityNotFound,setCityNotFound]=useState(false);
  const [error,setError]=useState(null);


  const weatherIcon={
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": drizzleIcon,
    "04n": drizzleIcon,
    "09d": rainIcon,
    "09n": rainIcon,
    "10d": rainIcon,
    "10n": rainIcon,
    "13d": snowIcon,
    "13n": snowIcon,
  };

  const search=async()=>{
    setLoading(true);
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${text}
    &appid=${apiKey}&units=Metric`;

    try{
      const res=await fetch(url);
      const data=await res.json();
      if(data.cod==="404")
        {
          console.log("City Not Found ");
          setCityNotFound(true);
          setLoading(false);
          return;
         }
         setHumidity(data.main.humidity);
         setWind(data.wind.speed);
         setCountry(data.sys.country);
         setLat(data.coord.lat);
         setLong(data.coord.lon);
         setTemp(Math.floor(data.main.temp));
         setCity(data.name);
         const weatherIconCode=data.weather[0].icon;
         setIcon(weatherIcon[weatherIconCode]||cloudIcon);
         setCityNotFound(false);
      }
    catch(error)
    {
      console.error("Error Occurred:",error.message);
      setError("Error occured while fetching the data");
    }
    finally{
      setLoading(false);

    }
  }
  const handleCity=(e)=>{
    setText(e.target.value);

  }
  const handleKeyDown=(e)=>
    {
      if(e.key==="Enter")
        {
          search();
        }
    }
    useEffect(function(){
      search();
    },[]);
  return (
    <>
    <div className="container">
      <div className='input-container'>
        <input type="text" className="city-input" placeholder='Enter city' value={text}
        onChange={handleCity} onKeyDown={handleKeyDown}/>
        <div className='search-icon' onClick={()=>search()}>
          <img src={searchIcon} alt="search"/>
        </div>
       
        
      </div>
     

      {loading&&<div className='loading-message'>Loading...</div>}
      {error&&<div className='error-message'>{error}</div>}
      {cityNotFound&&<div className='city-not-found'>City Not Found</div>}

      {!loading && !cityNotFound &&<WeatherDetails icon={icon} temp={temp} city={city}
       country={country} lat={lat} long={long} humidity={humidity} wind={wind}  />}

      <p className='para'>Designed by <span>Mohana Pradeepa</span></p>
      
    </div>
    </>
  );
}

export default App;
