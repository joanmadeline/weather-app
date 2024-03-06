import Weather from "./components/Weather";
import "./App.css";
import logo from "./logo.png";

function App() {
  return (
    <div className="App">
      <div className="bg-overlay md:relative">
        <div className="container mx-auto px-4 py-8 sm:px-8 md:px-4 lg:px-24 xl:px-40">
          <img src={logo} alt="Logo" className="h-20 w-auto py-1 mb-10" />
          <Weather />
          <p className="text-center text-sm mt-8 md:absolute bottom-2 left-0 right-0 mx-auto">
            © 2024 | Madeline Poniman | Powered by{" "}
            <a href="https://www.weatherapi.com/" title="Free Weather API">
              WeatherAPI.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
