import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WeatherCard from './components/WeatherCard'
import ForecastCard from './components/ForecastCard'
import LocationSearch from './components/LocationSearch'
import ThemeToggle from './components/ThemeToggle'
import LoadingSpinner from './components/LoadingSpinner'
import { useWeatherData } from './hooks/useWeatherData'
import { useGeolocation } from './hooks/useGeolocation'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const { location, error: locationError, getCurrentLocation } = useGeolocation()
  const { weatherData, forecast, loading, error, fetchWeather } = useWeatherData()

  useEffect(() => {
    if (location && !selectedLocation) {
      fetchWeather(location.latitude, location.longitude)
    }
  }, [location, selectedLocation, fetchWeather])

  useEffect(() => {
    if (selectedLocation) {
      fetchWeather(selectedLocation.lat, selectedLocation.lon)
    }
  }, [selectedLocation, fetchWeather])

  const handleLocationSelect = (locationData) => {
    setSelectedLocation(locationData)
  }

  const handleCurrentLocation = () => {
    setSelectedLocation(null)
    getCurrentLocation()
  }

  const getBackgroundGradient = () => {
    if (!weatherData) return 'from-blue-400 via-purple-500 to-pink-500'
    
    const condition = weatherData.weather[0].main.toLowerCase()
    switch (condition) {
      case 'clear':
        return 'from-yellow-400 via-orange-500 to-red-500'
      case 'clouds':
        return 'from-gray-400 via-blue-500 to-indigo-600'
      case 'rain':
      case 'drizzle':
        return 'from-gray-600 via-gray-700 to-gray-800'
      case 'snow':
        return 'from-blue-200 via-purple-300 to-indigo-400'
      case 'thunderstorm':
        return 'from-gray-800 via-purple-900 to-black'
      default:
        return 'from-blue-400 via-purple-500 to-pink-500'
    }
  }

  return (
    <div className={`min-h-screen transition-all duration-1000 ${isDark ? 'dark' : ''}`}>
      <motion.div 
        className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.header 
            className="flex justify-between items-center mb-8"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl px-6 py-3">
              <h1 className="text-2xl font-bold text-white">Weather Glass</h1>
            </div>
            <div className="flex items-center gap-4">
              <LocationSearch 
                onLocationSelect={handleLocationSelect}
                onCurrentLocation={handleCurrentLocation}
              />
              <ThemeToggle isDark={isDark} onToggle={setIsDark} />
            </div>
          </motion.header>

          {/* Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-center items-center h-64"
              >
                <LoadingSpinner />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          <AnimatePresence>
            {(error || locationError) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass rounded-2xl p-6 mb-8 border-red-300"
              >
                <p className="text-red-200 text-center">
                  {error || locationError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Weather Content */}
          <AnimatePresence>
            {weatherData && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Main Weather Card */}
                <div className="lg:col-span-2">
                  <WeatherCard weatherData={weatherData} />
                </div>

                {/* Forecast Cards */}
                <div className="space-y-4">
                  <motion.h2 
                    className="text-xl font-semibold text-white mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    7-Day Forecast
                  </motion.h2>
                  {forecast.map((day, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <ForecastCard forecast={day} index={index} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default App
