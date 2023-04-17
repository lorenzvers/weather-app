import "./App.css";
import { useState } from "react";

import WeatherApp from "./components/WeatherApp";

function App() {
  const [bgColor, setbgColor] = useState(null);

  const bgFromTemp = (data) => {
    const temperature = data?.main?.temp ?? null;
    console.log(temperature);
    const hot =
      "linear-gradient( 68.3deg, rgba(245,177,97,1) 0.4%, rgba(236,54,110,1) 100.2% )";
    const mild =
      "linear-gradient( 91deg, rgba(72,154,78,1) 5.2%, rgba(251,206,70,1) 95.9% )";
    const cold =
      "linear-gradient( 270.3deg, rgba(84,212,228,1) 0.2%, rgba(68,36,164,1) 100% )";
    const none =
      "radial-gradient( circle farthest-corner at 10% 20%, rgba(255,19,120,1) 0%, rgba(0,0,0,1) 90.5%)";

    if (temperature === null) {
      setbgColor(none);
      return;
    } else if (temperature > 28) {
      setbgColor(hot);
      return;
    } else if (temperature > 15) {
      setbgColor(mild);
      return;
    } else if (temperature <= 15) {
      setbgColor(cold);
      return;
    }
  };

  return (
    <div className="App" style={{ backgroundImage: bgColor }}>
      <div className="weather-box">
        <WeatherApp getData={bgFromTemp} />
      </div>
    </div>
  );
}

export default App;
