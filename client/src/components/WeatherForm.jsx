import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
const WeatherForm = (props) => {
  //what is inside props = {city, handleCityChange, handleSubmit}
  return (
    <div className="weatherFormMainDiv">
      <h1 className="weatherFormHeader">
        Your{" "}
        <span>
          <br />
          Weather Forecast
        </span>
      </h1>
      <form onSubmit={props.handleSubmit}>
        <div className="formDiv">
          <input
            id="city-name"
            type="text"
            placeholder="Please enter your city"
            name="city"
            value={props.city}
            onChange={props.handleCityChange}
            required // instead of readonly, change to required
            className="searchBar"
          />
          <button type="submit" className="submitButton">
            <FontAwesomeIcon className="icon" icon={faSearch} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeatherForm;
