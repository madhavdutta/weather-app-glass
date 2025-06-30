import React from 'react'
import { motion } from 'framer-motion'
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  Zap,
  CloudDrizzle,
  Cloudy
} from 'lucide-react'

const WeatherIcon = ({ condition, size = 60 }) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return Sun
      case 'clouds':
        return Cloud
      case 'rain':
        return CloudRain
      case 'drizzle':
        return CloudDrizzle
      case 'snow':
        return CloudSnow
      case 'thunderstorm':
        return Zap
      case 'mist':
      case 'fog':
      case 'haze':
        return Cloudy
      default:
        return Sun
    }
  }

  const Icon = getIcon()

  const getColor = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'text-yellow-300'
      case 'clouds':
        return 'text-gray-300'
      case 'rain':
      case 'drizzle':
        return 'text-blue-300'
      case 'snow':
        return 'text-white'
      case 'thunderstorm':
        return 'text-purple-300'
      default:
        return 'text-yellow-300'
    }
  }

  const getAnimation = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return {
          rotate: [0, 360],
          transition: { duration: 20, repeat: Infinity, ease: "linear" }
        }
      case 'rain':
      case 'drizzle':
        return {
          y: [0, -5, 0],
          transition: { duration: 2, repeat: Infinity }
        }
      case 'thunderstorm':
        return {
          scale: [1, 1.1, 1],
          transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 }
        }
      default:
        return {
          y: [0, -10, 0],
          transition: { duration: 4, repeat: Infinity }
        }
    }
  }

  return (
    <motion.div
      animate={getAnimation()}
      className={`${getColor()} drop-shadow-lg`}
    >
      <Icon size={size} />
    </motion.div>
  )
}

export default WeatherIcon
