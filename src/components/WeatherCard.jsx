import React from 'react'
import { motion } from 'framer-motion'
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset,
  MapPin
} from 'lucide-react'
import WeatherIcon from './WeatherIcon'

const WeatherCard = ({ weatherData }) => {
  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather: [{ main: condition, description, icon }],
    wind: { speed },
    visibility,
    sys: { sunrise, sunset }
  } = weatherData

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const weatherStats = [
    { icon: Thermometer, label: 'Feels like', value: `${Math.round(feels_like)}°` },
    { icon: Droplets, label: 'Humidity', value: `${humidity}%` },
    { icon: Wind, label: 'Wind Speed', value: `${Math.round(speed)} m/s` },
    { icon: Eye, label: 'Visibility', value: `${Math.round(visibility / 1000)} km` },
    { icon: Gauge, label: 'Pressure', value: `${pressure} hPa` },
  ]

  return (
    <motion.div
      className="glass rounded-3xl p-8 text-white"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Location */}
      <motion.div 
        className="flex items-center gap-2 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MapPin className="w-5 h-5 text-blue-300" />
        <h2 className="text-2xl font-bold">{name}</h2>
      </motion.div>

      {/* Main Weather Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Temperature and Icon */}
        <motion.div 
          className="text-center md:text-left"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <WeatherIcon condition={condition} size={80} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-6xl font-bold animate-pulse-slow">
                {Math.round(temp)}°
              </div>
              <div className="text-xl text-blue-200 capitalize">
                {description}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sun Times */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Sunrise className="w-5 h-5 text-yellow-300" />
              <span className="text-sm text-blue-200">Sunrise</span>
            </div>
            <div className="text-xl font-semibold">{formatTime(sunrise)}</div>
          </div>
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Sunset className="w-5 h-5 text-orange-300" />
              <span className="text-sm text-blue-200">Sunset</span>
            </div>
            <div className="text-xl font-semibold">{formatTime(sunset)}</div>
          </div>
        </motion.div>
      </div>

      {/* Weather Stats Grid */}
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {weatherStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.6 }}
          >
            <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-300" />
            <div className="text-xs text-blue-200 mb-1">{stat.label}</div>
            <div className="font-semibold">{stat.value}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default WeatherCard
