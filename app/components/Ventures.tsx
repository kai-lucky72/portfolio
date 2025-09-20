import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { ventures, uiLabels } = data

interface VenturesProps {
  isDarkMode: boolean
}

export default function Ventures({ isDarkMode }: VenturesProps) {
  return (
    <section id="ventures" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {ventures.title}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {ventures.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {ventures.list.map((venture, index) => (
            <VentureCard key={index} venture={venture} index={index} isDarkMode={isDarkMode} />
          ))}
        </div>

        <div className="mt-20">
          <h3 className={`text-2xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Core Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ventures.products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} isDarkMode={isDarkMode} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function VentureCard({ venture, index, isDarkMode }: { venture: any, index: number, isDarkMode: boolean }) {
  const isImagePath = venture.icon.startsWith('/')
  const Icon = !isImagePath ? resolveIcon(venture.icon) : null
  
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`relative p-8 rounded-2xl shadow-xl overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
      } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${venture.color} opacity-10 rounded-bl-full`} />
      
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-xl bg-gradient-to-br ${venture.color} text-white shadow-lg flex items-center justify-center overflow-hidden w-16 h-16`}>
          {isImagePath ? (
            <div className="relative w-full h-full">
              <Image 
                src={venture.icon} 
                alt={venture.name} 
                fill 
                className="object-contain"
              />
            </div>
          ) : (
            Icon && <Icon size={28} />
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          venture.status === 'Active' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-blue-100 text-blue-700'
        }`}>
          {venture.status}
        </span>
      </div>

      <h3 className={`text-2xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{venture.name}</h3>
      <p className={`text-sm font-semibold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{venture.tagline}</p>
      
      <div className="flex items-center mb-6 space-x-2">
        <span className={`text-xs font-bold px-2 py-1 rounded bg-gray-200 ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'text-gray-700'}`}>
          {venture.role}
        </span>
      </div>

      <p className={`mb-8 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {venture.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-8">
        {venture.products.map((prod: string, i: number) => (
          <span 
            key={i} 
            className={`text-xs px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {prod}
          </span>
        ))}
      </div>

      <motion.a
        href={venture.link}
        whileHover={{ x: 5 }}
        className={`inline-flex items-center text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} hover:underline`}
      >
        {uiLabels.viewVenture} <span className="ml-1">→</span>
      </motion.a>
    </motion.div>
  )
}

function ProductCard({ product, index, isDarkMode }: { product: any, index: number, isDarkMode: boolean }) {
  const isImagePath = product.icon.startsWith('/')
  const Icon = !isImagePath ? resolveIcon(product.icon) : null
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
      } border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${product.color} text-white flex items-center justify-center mb-4 shadow-md overflow-hidden p-2`}>
        {isImagePath ? (
          <div className="relative w-full h-full">
            <Image 
              src={product.icon} 
              alt={product.name} 
              fill 
              className="object-contain"
            />
          </div>
        ) : (
          Icon && <Icon size={24} />
        )}
      </div>
      <h4 className={`text-lg font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</h4>
      <p className={`text-xs font-semibold mb-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>by {product.parent}</p>
      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {product.description}
      </p>
    </motion.div>
  )
}

