# Weather Forecast Application

A modern and responsive weather application built with React that provides real-time weather information and forecasts. Users can search for cities worldwide or use their IP-based location to get weather updates.

![Weather App Screenshot](screenshot.png)

## Features

- 🔍 Search cities worldwide with autocomplete suggestions
- 📍 Automatic location detection using IP
- 🌡️ Current weather conditions including:
  - Temperature
  - Real feel
  - Humidity
  - Wind speed
  - Pressure
  - UV index
- ⏰ Local time display
- 📅 Hourly forecast
- 📊 7-day weather forecast
- 🎨 Clean and intuitive user interface
- 📱 Responsive design

## Tech Stack

- **Frontend Framework:** React + Vite
- **Styling:** TailwindCSS
- **Icons:** Font Awesome
- **APIs:**
  - WeatherAPI for weather data
  - ipapi.co for IP-based location

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- WeatherAPI key (Get one at [WeatherAPI](https://www.weatherapi.com/))

### Installation

1. Clone the repository

env
VITE_WEATHER_API_KEY=your_weatherapi_key_here

src/
├── components/
│ ├── CityFormContainer.jsx # City search and location detection
│ ├── WeatherCast.jsx # Weather forecast display
│ └── Home.jsx # Main component
├── services/
│ └── weatherService.js # API integration
└── App.jsx # Root component

## API Integration

### WeatherAPI

- Used for fetching weather data and city search
- Endpoints used:
  - `/forecast.json` - Current and forecast weather
  - `/search.json` - City search autocomplete

### ipapi.co

- Used for IP-based location detection
- Returns user's city based on IP address

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [WeatherAPI](https://www.weatherapi.com/) for weather data
- [ipapi](https://ipapi.co/) for geolocation services
- [TailwindCSS](https://tailwindcss.com/) for styling
- [Font Awesome](https://fontawesome.com/) for icons
