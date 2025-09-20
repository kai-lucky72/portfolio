'use client'

import React from 'react'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { footer } = data

interface FooterProps {
  isDarkMode: boolean
}

const Footer: React.FC<FooterProps> = ({ isDarkMode }) => (
  <footer className={`py-8 ${isDarkMode ? 'bg-gray-900 border-t border-gray-800' : 'bg-white border-t border-gray-200'} text-${isDarkMode ? 'white' : 'black'}`}>
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
      <p>{footer.copyright}</p>
      <div className="flex space-x-4 mt-4 md:mt-0">
        {footer.socials.map((social, index) => {
          const Icon = resolveIcon(social.icon)
          return (
            <a
              key={index}
              href={social.url}
              className="hover:text-blue-400 transition-colors duration-300"
              aria-label={social.platform}
            >
              <Icon size={24} />
            </a>
          )
        })}
      </div>
    </div>
  </footer>
)

export default Footer