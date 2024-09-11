import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplet, MapPin, Search, Settings, Snowflake, CloudLightning, Moon, Thermometer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './index.css'; // Adjust the path if necessary

const WeatherApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [weatherCondition, setWeatherCondition] = useState('sunny');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [temperature, setTemperature] = useState(72);
  const [temperatureUnit, setTemperatureUnit] = useState('F');

  useEffect(() => {
    // Simulate weather changes
    const interval = setInterval(() => {
      const conditions = ['sunny', 'cloudy', 'rainy', 'thunder', 'snowy'];
      setWeatherCondition(conditions[Math.floor(Math.random() * conditions.length)]);
      setTemperature(Math.floor(Math.random() * 30) + 50);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getTheme = (condition) => {
    const baseTheme = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
    switch (condition) {
      case 'sunny':
        return `${baseTheme} bg-gradient-to-br from-yellow-200 to-yellow-400`;
      case 'cloudy':
        return `${baseTheme} bg-gradient-to-br from-gray-300 to-gray-500`;
      case 'rainy':
        return `${baseTheme} bg-gradient-to-br from-blue-300 to-blue-500`;
      case 'thunder':
        return `${baseTheme} bg-gradient-to-br from-purple-600 to-purple-800`;
      case 'snowy':
        return `${baseTheme} bg-gradient-to-br from-blue-100 to-blue-300`;
      default:
        return baseTheme;
    }
  };

  const WeatherIcon = ({ condition, size = 48 }) => {
    const baseClass = "transition-all duration-300 ease-in-out";
    switch (condition) {
      case 'sunny':
        return <Sun size={size} className={`${baseClass} text-yellow-500 animate-spin-slow`} />;
      case 'cloudy':
        return <Cloud size={size} className={`${baseClass} text-gray-400 animate-pulse`} />;
      case 'rainy':
        return <CloudRain size={size} className={`${baseClass} text-blue-400 animate-bounce`} />;
      case 'thunder':
        return <CloudLightning size={size} className={`${baseClass} text-purple-400 animate-pulse`} />;
      case 'snowy':
        return <Snowflake size={size} className={`${baseClass} text-blue-300 animate-wiggle`} />;
      default:
        return <Sun size={size} className={`${baseClass} text-yellow-500`} />;
    }
  };

  const hourlyData = [
    { time: '12AM', temp: 68 },
    { time: '3AM', temp: 65 },
    { time: '6AM', temp: 67 },
    { time: '9AM', temp: 72 },
    { time: '12PM', temp: 76 },
    { time: '3PM', temp: 78 },
    { time: '6PM', temp: 75 },
    { time: '9PM', temp: 71 },
  ];

  const dailyData = [
    { day: 'Mon', temp: 72, humidity: 30, wind: 5 },
    { day: 'Tue', temp: 75, humidity: 35, wind: 7 },
    { day: 'Wed', temp: 70, humidity: 40, wind: 6 },
    { day: 'Thu', temp: 73, humidity: 38, wind: 8 },
    { day: 'Fri', temp: 76, humidity: 32, wind: 5 },
    { day: 'Sat', temp: 74, humidity: 36, wind: 6 },
    { day: 'Sun', temp: 71, humidity: 39, wind: 7 },
  ];

  const convertTemperature = (temp) => {
    if (temperatureUnit === 'C') {
      return Math.round((temp - 32) * 5/9);
    }
    return temp;
  };

  const HomePage = () => (
    <div className="space-y-6">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <WeatherIcon condition={weatherCondition} />
          <div className="text-5xl font-bold animate-fade-in">
            {convertTemperature(temperature)}°{temperatureUnit}
          </div>
        </div>
        <div className="text-2xl mb-2 capitalize">{weatherCondition}</div>
        <div className="flex items-center text-sm">
          <Wind className="mr-1" size={16} />
          <span className="mr-3">5 mph</span>
          <Droplet className="mr-1" size={16} />
          <span>30%</span>
        </div>
      </div>

      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Hourly Forecast</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={hourlyData}>
            <XAxis dataKey="time" stroke="currentColor" />
            <YAxis stroke="currentColor" />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', color: '#333' }} />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const ForecastPage = () => (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
      {dailyData.map((day, index) => (
        <div key={day.day} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
          <span className="text-lg">{day.day}</span>
          <div className="flex items-center space-x-4">
            <WeatherIcon condition={['sunny', 'cloudy', 'rainy', 'thunder', 'snowy'][index % 5]} size={24} />
            <span className="text-lg">{convertTemperature(day.temp)}°{temperatureUnit}</span>
            <div className="flex items-center">
              <Droplet size={16} className="mr-1" />
              <span>{day.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind size={16} className="mr-1" />
              <span>{day.wind} mph</span>
            </div>
          </div>
        </div>
      ))}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Temperature Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="temp" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-lg">Temperature Unit</span>
          <select 
            className="bg-transparent border border-current rounded px-3 py-1"
            value={temperatureUnit}
            onChange={(e) => setTemperatureUnit(e.target.value)}
          >
            <option value="F">Fahrenheit</option>
            <option value="C">Celsius</option>
          </select>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg">Dark Mode</span>
          <button
            className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? 'On' : 'Off'}
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg">Notifications</span>
          <input type="checkbox" className="toggle" />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-4 ${getTheme(weatherCondition)} transition-all duration-1000`}>
      <div className="max-w-md mx-auto">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <MapPin className="mr-2" />
            <span className="text-xl font-semibold">South Africa, SA</span>
          </div>
          <div className="flex items-center space-x-4">
            <Search className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setCurrentPage('forecast')} />
            <Settings className="cursor-pointer hover:scale-110 transition-transform" onClick={() => setCurrentPage('settings')} />
          </div>
        </header>

        <main className="mb-6">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'forecast' && <ForecastPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>

        <nav className="fixed bottom-4 left-0 right-0 flex justify-center">
          <div className="flex space-x-2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full p-1">
            <button 
              onClick={() => setCurrentPage('home')} 
              className={`px-4 py-2 rounded-full transition-colors ${currentPage === 'home' ? 'bg-white bg-opacity-40' : 'hover:bg-white hover:bg-opacity-20'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('forecast')} 
              className={`px-4 py-2 rounded-full transition-colors ${currentPage === 'forecast' ? 'bg-white bg-opacity-40' : 'hover:bg-white hover:bg-opacity-20'}`}
            >
              Forecast
            </button>
            <button 
              onClick={() => setCurrentPage('settings')} 
              className={`px-4 py-2 rounded-full transition-colors ${currentPage === 'settings' ? 'bg-white bg-opacity-40' : 'hover:bg-white hover:bg-opacity-20'}`}
            >
              Settings
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default WeatherApp;