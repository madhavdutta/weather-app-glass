import React from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import WeatherIcon from './WeatherIcon'

const ForecastCard = ({ forecast, index }) => {
  const { date, high, low, condition, description, humidity, windSpeed } = forecast

  return (
    <motion.div
      className="glass rounded-2xl p-4 text-white hover:bg-white/20 transition-all duration-300"
      whileHover={{ scale: 1.03, x: 5 }}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <div className="flex items-center justify-between">
        {/* Date and Weather Icon */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <WeatherIcon condition={condition} size={40} />
          </motion.div>
          <div>
            <div className="font-semibold">
              {index === 0 ? 'Today' : format(new Date(date), 'EEE')}
            </div>
            <div className="text-xs text-blue-200 capitalize">
              {description}
            </div>
          </div>
        </div>

        {/* Temperature */}
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">{Math.round(high)}°</span>
            <span className="text-sm text-blue-300">{Math.round(low)}°</span>
          </div>
          <div className="text-xs text-blue-200 mt-1">
            {humidity}% • {Math.round(windSpeed)} m/s
          </div>
        </div>
      </div>

      {/* Temperature Bar */}
      <motion.div 
        className="mt-3 h-1 bg-white/20 rounded-full overflow-hidden"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2 * index + 0.5, duration: 0.8 }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((high - low) / 40) * 100}%` }}
          transition={{ delay: 0.2 * index + 0.7, duration: 1 }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ForecastCard
