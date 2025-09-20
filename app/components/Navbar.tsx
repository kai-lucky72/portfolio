'use client'

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, X, Menu } from "lucide-react"
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

interface NavbarProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
}

const { navbar } = data

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navbar.navItems.map(item => item.name.toLowerCase().replace(' ', '-'))
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${isDarkMode ? 'bg-gradient-to-r from-purple-500' : 'bg-gradient-to-r from-blue-500 to-green-500'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white font-bold text-xl">{navbar.logo}</span>
          </motion.div>

          <div className="hidden lg:flex items-center">
            <motion.ul 
              className={`flex justify-center items-center space-x-1 p-2 rounded-full ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md`}
              initial={{ y: -100 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {navbar.navItems.map((item) => {
                const Icon = resolveIcon(item.icon)
                return (
                  <motion.li key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <a
                      href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                      className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm ${
                        activeSection === item.name.toLowerCase().replace(' ', '-')
                          ? isDarkMode
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-200 text-gray-800'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700/50'
                          : 'text-gray-600 hover:bg-gray-100/50'
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </a>
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-800'}`}
              onClick={toggleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <button
              className={`lg:hidden ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm`}
          >
            <ul className="container mx-auto px-4 py-2 space-y-2">
              {navbar.navItems.map((item) => {
                const Icon = resolveIcon(item.icon)
                return (
                  <motion.li key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href={`#${item.name.toLowerCase().replace(' ', '-')}`}
                      className={`flex items-center space-x-2 p-2 rounded-md ${
                        activeSection === item.name.toLowerCase().replace(' ', '-')
                          ? isDarkMode
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-200 text-gray-800'
                          : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700/50'
                          : 'text-gray-600 hover:bg-gray-100/50'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

