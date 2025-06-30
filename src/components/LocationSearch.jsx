import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, MapPin, Locate } from 'lucide-react'

const LocationSearch = ({ onLocationSelect, onCurrentLocation }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  // Mock cities data - in a real app, you'd use a geocoding API
  const mockCities = [
    { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
    { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
    { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
    { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
    { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
    { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
    { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
    { name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
    { name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832 }
  ]

  useEffect(() => {
    if (query.length > 1) {
      setLoading(true)
      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = mockCities.filter(city =>
          city.name.toLowerCase().includes(query.toLowerCase())
        )
        setSuggestions(filtered)
        setLoading(false)
        setIsOpen(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setIsOpen(false)
    }
  }, [query])

  const handleLocationSelect = (location) => {
    setQuery(location.name)
    setIsOpen(false)
    onLocationSelect(location)
  }

  const handleCurrentLocation = () => {
    setQuery('')
    setIsOpen(false)
    onCurrentLocation()
  }

  return (
    <div className="relative">
      <motion.div 
        className="glass rounded-2xl p-3 flex items-center gap-3"
        whileFocus={{ scale: 1.02 }}
      >
        <Search className="w-5 h-5 text-white/70" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search location..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent text-white placeholder-white/50 outline-none flex-1 min-w-0"
        />
        <motion.button
          onClick={handleCurrentLocation}
          className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Locate className="w-4 h-4 text-white/70" />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl overflow-hidden z-50"
          >
            {loading ? (
              <div className="p-4 text-center text-white/70">
                Searching...
              </div>
            ) : suggestions.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                {suggestions.map((location, index) => (
                  <motion.button
                    key={`${location.name}-${location.country}`}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full p-3 text-left hover:bg-white/20 transition-colors flex items-center gap-3 text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="w-4 h-4 text-blue-300" />
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-sm text-white/60">{location.country}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-white/70">
                No locations found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LocationSearch
