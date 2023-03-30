import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import MyNavBar from "./components/Navbar";
import WeatherCard from "./components/WeatherCard";
import WeatherForm from "./components/WeatherForm";


function App() {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);

  //A function to do the get request and set the state from openweather api
  const loadCity = (city) => {
    // pass city name as a param
    const params = new URLSearchParams({ cityName: city });
    // fetch the data from the backend
    fetch(`http://localhost:8081/weather?${params}`)
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
    loadCity(city);
    // reset search bar to nothing
    setCity("");
  };

  return (
    <div className="App">
      <MyNavBar />
     <WeatherForm city={city} handleCityChange={handleCityChange} handleSubmit={handleSubmit}/>
      {!result ? <p></p> : <WeatherCard data={result} /> }
    </div>
  );
}

export default App;
