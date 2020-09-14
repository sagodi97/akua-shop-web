import React, { useEffect, useState } from "react";
import * as navbarUtils from "./utils";
import "./index.css";
import logo from "./goat_logo_100.png";

function Navbar() {
  const [date, setDate] = useState(navbarUtils.formatDate(new Date()));
  const [weather, setWeather] = useState("");

  useEffect(() => getWeather());

  useEffect(() => {
    var timerID = setInterval(
      () => setDate(navbarUtils.formatDate(new Date())),
      60000
    );

    return function cleanup() {
      clearInterval(timerID);
    };
  }, [date]);

  const getWeather = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let api_key = process.env.REACT_APP_WEATHER_API_KEY;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${api_key}`
      )
        .then((raw) => raw.json())
        .then((res) => {
          let output = res.weather
            ? `${parseFloat(res.main.temp).toFixed(1)} °C, ${res.name}`
            : "";
          setWeather(output);
        });
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-group ">
        <div className="nav-item">{date}</div>
        <div className="nav-item">{weather}</div>
      </div>
      <div className="nav-group brand">
        <div className="brand-name">
          <strong style={{ whiteSpace: "nowrap" }}>Akua Shop</strong>
        </div>
        <div className="nav-item brand-logo">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
