import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import MyNavBar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";
import DropDown from "./components/countrycodes";
import ListStudents from './components/ListStudents'

function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [country, setCountry] = useState("");

  //A function to do the get request and set the state from openweather api
  const loadCity = (city) => {
    // pass city name as a param
    const params = new URLSearchParams({ cityName: city });
    // fetch the data from the backend
    fetch(`http://localhost:8080/weather?${params}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log("this is the data: ", result)
        setCity(result.name);
        setResult(result);
      });
  };

  //A function to do the get request and set the state from openweather api
  const loadCityCountry = (city, country) => {
    let formatSearch = `${city},${country}`;
    // pass city name as a param
    const params = new URLSearchParams({ searchCity: formatSearch });
    // fetch the data from the backend
    fetch(`http://localhost:8080/weatherCountry?${params}`)
      .then((response) => response.json())
      .then((result) => {
        // console.log("this is the data: ", result)
        setCity(result.name);
        setResult(result);
      });
  };

  // change city value
  const handleCityChange = (event) => {
    // console.log(event.target.value)
    setCity(event.target.value);
    // console.log(city);
  };

  // loads the city data when submitting
  const handleSubmit = (e) => {
    e.preventDefault();
    // pass in the city to loadCity to get data from backend
    console.log(city);
    if (country && city) {
      loadCityCountry(city, country);
    } else {
      loadCity(city);
    }
    // reset search bar to nothing
    setCity("");
    setCountry("");
  };

  return (
    <div className="App">
      <MyNavBar />
      <div className="AppOuter">
        <div className="AppInner">
          <WeatherForm
            city={city}
            handleCityChange={handleCityChange}
            handleSubmit={handleSubmit}
          />
          <DropDown country={country} setCountry={setCountry} />
           {!result ? <p></p> : <WeatherCard data={result} /> }
        </div>
        <div className="DropDown" >
        </div>
      </div>
      <ListStudents />
    </div>
  );
}

export default App;
