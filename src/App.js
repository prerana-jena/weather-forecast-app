import './App.css';
import { useState } from "react";

function App() {

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {

    if (city.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    try {

      setLoading(true);

      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      const response = await fetch(url);
      const data = await response.json();

      console.log(data);

      if (data.cod !== 200) {
        alert("City not found");
        setWeather(null);
        return;
      }

      setWeather(data);

    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="app">

      <img
        className="banner"
        src="https://images.unsplash.com/photo-1504608524841-42fe6f032b4b"
        alt="weather banner"
      />

      <h2>Know the Weather!!</h2>

      <input
        type="text"
        value={city}
        placeholder="Enter city name"
        onChange={(e) => setCity(e.target.value)}

        onKeyDown={(e) => {
          if (e.key === "Enter") {
            getWeather();
          }
        }}
      />

      <div>
        <button onClick={getWeather}>Search</button>
      </div>

      {loading && <p>Loading...</p>}

      {weather && weather.main && (

        <div className="weather-card">

          <h2>{weather.name}</h2>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />

          <p>Temperature: {weather.main.temp}°C</p>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Condition: {weather.weather[0].main}</p>

          <p>Wind Speed: {weather.wind.speed} m/s</p>

        </div>
      )}

    </div>
  );
}

export default App;