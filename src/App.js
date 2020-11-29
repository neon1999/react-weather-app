import React, { useState, useEffect } from "react";
import "./App.css";
import Forecast from "./forecast";
import Allcities from "all-countries-and-cities-json";

// import Sunny from "./images/sunny.jpeg";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    getGeoLocation();
    // console.log(Allcities);
    //first time to get users location and call weather api
  }, []);

  function getGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        // setQuery(`${p.coords.latitude},${p.coords.longitude}`);
        fetchApi(`${p.coords.latitude},${p.coords.longitude}`);
      });
    } else {
      fetchApi("Kolkata");
    }
  }

  const search = (evt) => {
    if (evt.key === "Enter") {
      //every time users enters a new city
      fetchApi(query);
    }
  };
  const array1 = [1, 4, 9, 16];

  function fetchApi(query) {
    fetch(`https://rapidapi.p.rapidapi.com/forecast.json?q=${query}&days=3`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "3275f6e223mshae32176c37294c2p1a5d56jsna9cad3c9ad0f",
        "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        setQuery("");
        //  console.log(data);
      });
  }

  const getFullDate = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    if (date === 1) return `${day} ${date}st ${month} ${year}`;
    else if (date === "2") return `${day} ${date}nd ${month} ${year}`;
    else if (date == "3") return `${day} ${date}rd ${month} ${year}`;
    else return `${day} ${date}th ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.current != "undefined"
          ? weather.current.condition.text === "Mist" ||
            weather.current.condition.text === "Overcast"
            ? "app winter"
            : weather.current.condition.text === "Clear"
            ? "app clear"
            : "app"
          : "app"
      }
    >
      <div className="search-box">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          className="search-bar"
          value={query}
          placeholder="Enter City"
          onKeyPress={search}
        />
      </div>

      {typeof weather.location != "undefined" ? (
        <div>
          <div className="location-box">
            <div className="location">
              {weather.location.name},{weather.location.region},
              {weather.location.country}
            </div>
            <div className="date">
              <h1>{getFullDate(new Date())}</h1>
            </div>
          </div>
          <div className="weather-box">
            <div className="temp-container">
              <h1 className="temp">{Math.ceil(weather.current.temp_c)}°c</h1>
              <div className="weather-status">
                <div className="weather-icon-container">
                  <img
                    className="weather-icon"
                    src={weather.current.condition.icon}
                    alt=""
                  />
                </div>

                <h2 className="weather-text">
                  {weather.current.condition.text}
                </h2>
              </div>
              <div className="temp-last-margin"></div>
            </div>

            <div className="temp-otherdetails">
              <div className="weather-Divider"></div>
              <div className="temp-actual-info">
                <h1>
                  Feels Like{" "}
                  <span>{Math.ceil(weather.current.feelslike_c)}°c</span>
                </h1>
                <h1>
                  Humidity <span>{weather.current.humidity} %</span>
                </h1>
                <h1>
                  Wind Speed <span>{weather.current.wind_kph} kp/h</span>
                </h1>
                <h1>
                  Precipitation <span>{weather.current.precip_mm} mm</span>
                </h1>
              </div>
            </div>
          </div>
          {/* <Forecast /> */}
        </div>
      ) : (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default App;
