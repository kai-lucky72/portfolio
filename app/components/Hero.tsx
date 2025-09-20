'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IconType } from 'react-icons'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { hero } = data

interface HeroProps {
  isDarkMode: boolean
}

export default function Hero({ isDarkMode }: HeroProps) {
  const [typedText, setTypedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const handleTyping = useCallback(() => {
    const i = loopNum % hero.typingText.length
    const fullText = hero.typingText[i]

    setTypedText(
      isDeleting
        ? fullText.substring(0, typedText.length - 1)
        : fullText.substring(0, typedText.length + 1)
    )

    if (!isDeleting && typedText === fullText) {
      setTimeout(() => setIsDeleting(true), 1000)
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false)
      setLoopNum(loopNum => loopNum + 1)
    }

    setTypingSpeed(isDeleting ? 50 : 150)
  }, [typedText, isDeleting, loopNum])

  useEffect(() => {
    const typingTimer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(typingTimer)
  }, [handleTyping, typingSpeed])

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center relative overflow-hidden pt-20 transition-all duration-300 ease-in-out ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-50 text-gray-900'
      }`}
    >
      <AnimatedBackground isDarkMode={isDarkMode} />
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 relative z-10">
        <motion.div 
          className="w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className={`lg:text-xl px-4 py-2 rounded-full inline-block ${
              isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            }`}>
              {hero.greeting}
            </span>
          </motion.div>
          <h1 className={`text-4xl lg:text-6xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            I&apos;m {hero.name}
          </h1>
          <div className={`text-2xl lg:text-4xl mb-4 h-16 transition-colors duration-300 ${
            isDarkMode ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {hero.prefix} {typedText}
            <span className="animate-blink">|</span>
          </div>
          <motion.button 
            className={`px-8 py-3 rounded-full text-white text-lg shadow-lg transform transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {hero.buttonText}
          </motion.button>
        </motion.div>
        <motion.div 
          className="w-full lg:w-1/2 flex justify-center lg:justify-end"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-64 h-64 lg:w-80 lg:h-80">
            <motion.div 
              className={`absolute inset-0 rounded-full opacity-20 blur-2xl ${
                isDarkMode ? 'bg-gradient-to-br from-blue-600 to-purple-700' : 'bg-gradient-to-br from-blue-400 to-purple-500'
              }`}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.img
              src={hero.image}
              alt={hero.name}
              className="absolute top-0 left-0 w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-2xl"
              whileHover={{ scale: 1.05 }}
            />
            {hero.techIcons.map((icon, index) => (
              <TechIcon 
                key={index}
                Icon={resolveIcon(icon.icon)}
                color={icon.color}
                top={icon.top}
                left={icon.left}
                bottom={icon.bottom}
                right={icon.right}
                animate={icon.animate as any}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

interface TechIconProps {
  Icon: IconType
  color: string
  top?: string
  left?: string
  bottom?: string
  right?: string
  animate?: 'spin' | 'spin-reverse' | 'bounce'
}

function TechIcon({ Icon, color, top, left, bottom, right, animate }: TechIconProps) {
  const animationProps = {
    spin: { rotate: 360 },
    'spin-reverse': { rotate: -360 },
    bounce: { y: [0, -10, 0] },
  }

  return (
    <motion.div
      className={`absolute ${color} w-8 h-8 lg:w-12 lg:h-12`}
      style={{ top, left, bottom, right }}
      animate={animate ? animationProps[animate] : {}}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    >
      <Icon />
    </motion.div>
  )
}

function AnimatedBackground({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: isDarkMode ? '#2563eb' : '#3b82f6', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: isDarkMode ? '#7c3aed' : '#8b5cf6', stopOpacity: 0.2 }} />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: isDarkMode ? '#2563eb' : '#3b82f6', stopOpacity: 0.1 }} />
            <stop offset="100%" style={{ stopColor: isDarkMode ? '#7c3aed' : '#8b5cf6', stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={isDarkMode ? '#111827' : '#f0f4f8'} />
        
        {/* Existing circles */}
        <circle cx="10%" cy="10%" r="5%" fill="url(#grad1)">
          <animate attributeName="cx" from="10%" to="90%" dur="20s" repeatCount="indefinite" />
          <animate attributeName="cy" from="10%" to="90%" dur="25s" repeatCount="indefinite" />
        </circle>
        <circle cx="90%" cy="90%" r="7%" fill="url(#grad1)">
          <animate attributeName="cx" from="90%" to="10%" dur="23s" repeatCount="indefinite" />
          <animate attributeName="cy" from="90%" to="10%" dur="28s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="50%" r="4%" fill="url(#grad1)">
          <animate attributeName="cx" from="50%" to="70%" dur="18s" repeatCount="indefinite" />
          <animate attributeName="cy" from="50%" to="30%" dur="22s" repeatCount="indefinite" />
        </circle>
        
        {/* New animated lines */}
        <line x1="0%" y1="20%" x2="100%" y2="80%" stroke="url(#grad2)" strokeWidth="2">
          <animate attributeName="y1" from="20%" to="80%" dur="15s" repeatCount="indefinite" />
          <animate attributeName="y2" from="80%" to="20%" dur="15s" repeatCount="indefinite" />
        </line>
        <line x1="10%" y1="80%" x2="100%" y2="20%" stroke="url(#grad2)" strokeWidth="2">
          <animate attributeName="y1" from="80%" to="20%" dur="18s" repeatCount="indefinite" />
          <animate attributeName="y2" from="20%" to="80%" dur="18s" repeatCount="indefinite" />
        </line>
        <line x1="20%" y1="0%" x2="80%" y2="100%" stroke="url(#grad2)" strokeWidth="2">
          <animate attributeName="x1" from="20%" to="80%" dur="20s" repeatCount="indefinite" />
          <animate attributeName="x2" from="80%" to="20%" dur="20s" repeatCount="indefinite" />
        </line>
        
        {/* Pulsating dots */}
        <circle cx="80%" cy="20%" r="1%" fill={isDarkMode ? '#4f46e5' : '#6366f1'}>
          <animate attributeName="r" values="1%;2%;1%" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="20%" cy="80%" r="1%" fill={isDarkMode ? '#4f46e5' : '#6366f1'}>
          <animate attributeName="r" values="1%;2%;1%" dur="7s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  )
}