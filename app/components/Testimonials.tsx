'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Image from 'next/image'
import data from '../data.json'

const { testimonials } = data

interface TestimonialsProps {
  isDarkMode: boolean
}

export default function Testimonials({ isDarkMode }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.list.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.list.length) % testimonials.list.length)
  }

  return (
    <section id="testimonials" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {testimonials.title}
        </motion.h2>
        <motion.p 
          className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {testimonials.description}
        </motion.p>
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <TestimonialCard testimonial={testimonials.list[currentIndex]} isDarkMode={isDarkMode} />
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-8">
            <motion.button
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'} shadow-lg`}
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
            <motion.button
              className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'} shadow-lg`}
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          {testimonials.list.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full mx-2 cursor-pointer ${
                index === currentIndex
                  ? isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                  : isDarkMode ? 'bg-gray-700' : 'bg-gray-300'
              }`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: {
    name: string
    text: string
    role: string
    image: string
  }
  isDarkMode: boolean
}

function TestimonialCard({ testimonial, isDarkMode }: TestimonialCardProps) {
  return (
    <motion.div
      className={`p-8 rounded-lg shadow-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 hover:shadow-2xl`}
      whileHover={{ scale: 1.05 }}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px)"
      }}
    >
      <div className="flex items-start mb-6">
        <Quote size={40} className={`mr-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <p className={`text-lg italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{testimonial.text}</p>
      </div>
      <div className="flex items-center mt-6">
        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{testimonial.name}</h4>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  )
}