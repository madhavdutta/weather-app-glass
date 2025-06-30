import { useState, useCallback } from 'react'

// Mock weather data generator
const generateMockWeatherData = (lat, lon) => {
  const cities = {
    '40.7128,-74.0060': 'New York',
    '51.5074,-0.1278': 'London',
    '35.6762,139.6503': 'Tokyo',
    '48.8566,2.3522': 'Paris',
    '-33.8688,151.2093': 'Sydney',
    '25.2048,55.2708': 'Dubai',
    '1.3521,103.8198': 'Singapore',
    '19.0760,72.8777': 'Mumbai',
    '52.5200,13.4050': 'Berlin',
    '43.6532,-79.3832': 'Toronto'
  }

  const key = `${lat.toFixed(4)},${lon.toFixed(4)}`
  const cityName = cities[key] || 'Unknown City'

  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm']
  const condition = conditions[Math.floor(Math.random() * conditions.length)]
  
  const baseTemp = Math.floor(Math.random() * 30) + 5 // 5-35°C
  
  return {
    name: cityName,
    main: {
      temp: baseTemp,
      feels_like: baseTemp + Math.floor(Math.random() * 6) - 3,
      humidity: Math.floor(Math.random() * 40) + 40,
      pressure: Math.floor(Math.random() * 100) + 1000
    },
    weather: [{
      main: condition,
      description: condition.toLowerCase(),
      icon: '01d'
    }],
    wind: {
      speed: Math.floor(Math.random() * 15) + 2
    },
    visibility: Math.floor(Math.random() * 5000) + 5000,
    sys: {
      sunrise: Date.now() / 1000 - 3600 * 2, // 2 hours ago
      sunset: Date.now() / 1000 + 3600 * 6   // 6 hours from now
    }
  }
}

const generateMockForecast = () => {
  const forecast = []
  const conditions = ['Clear', 'Clouds', 'Rain', 'Snow', 'Thunderstorm']
  
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    
    const condition = conditions[Math.floor(Math.random() * conditions.length)]
    const high = Math.floor(Math.random() * 20) + 15
    const low = high - Math.floor(Math.random() * 10) - 5
    
    forecast.push({
      date: date.toISOString(),
      high,
      low,
      condition,
      description: condition.toLowerCase(),
      humidity: Math.floor(Math.random() * 40) + 40,
      windSpeed: Math.floor(Math.random() * 15) + 2
    })
  }
  
  return forecast
}

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchWeather = useCallback(async (lat, lon) => {
    setLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockData = generateMockWeatherData(lat, lon)
      const mockForecast = generateMockForecast()
      
      setWeatherData(mockData)
      setForecast(mockForecast)
    } catch (err) {
      setError('Failed to fetch weather data')
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    weatherData,
    forecast,
    loading,
    error,
    fetchWeather
  }
}
