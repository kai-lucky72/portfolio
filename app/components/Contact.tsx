'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import emailjs from 'emailjs-com'
import data from '../data.json'
import { resolveIcon } from '../utils/icons'

const { contact, uiLabels } = data

interface ContactProps {
  isDarkMode: boolean
}

export default function Contact({ isDarkMode }: ContactProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const templateParams = {
      name,
      email,
      subject,
      message,
    }

    try {
      await emailjs.send(
        contact.emailjs.serviceId, 
        contact.emailjs.templateId, 
        templateParams,
        contact.emailjs.publicKey
      )
      setIsMessageSent(true)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setTimeout(() => setIsMessageSent(false), 5000)
    } catch (err) {
      console.error('Failed to send email:', err)
      setError(uiLabels.messageError)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {contact.title}
        </motion.h2>
        <motion.p 
          className={`mb-12 text-center max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {contact.description}
        </motion.p>
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            className={`w-full lg:w-1/3 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{uiLabels.contactInfo}</h3>
            {contact.info.map((item, index) => (
              <ContactInfo 
                key={index}
                icon={item.icon}
                title={item.title}
                content={item.content}
                isDarkMode={isDarkMode}
              />
            ))}
            <div className="mt-6 w-full h-64 rounded-lg overflow-hidden">
              <iframe
                src={contact.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          <motion.div 
            className={`w-full lg:w-2/3 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {isMessageSent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{uiLabels.thankYou}</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{uiLabels.thankYouSub}</p>
                  <button 
                    onClick={() => setIsMessageSent(false)}
                    className={`mt-6 px-6 py-2 rounded-md text-white ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'}`}
                  >
                    {uiLabels.sendAnother}
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <Input
                      type="text"
                      placeholder={uiLabels.namePlaceholder}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      isDarkMode={isDarkMode}
                    />
                    <Input
                      type="email"
                      placeholder={uiLabels.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      isDarkMode={isDarkMode}
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder={uiLabels.subjectPlaceholder}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    isDarkMode={isDarkMode}
                  />
                  <textarea
                    placeholder={uiLabels.messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full p-3 rounded-lg resize-none ${
                      isDarkMode 
                        ? 'bg-gray-700 text-white placeholder-gray-400' 
                        : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    rows={6}
                    required
                  ></textarea>
                  <motion.button
                    type="submit"
                    className={`w-full py-3 px-6 rounded-lg text-white font-semibold flex items-center justify-center space-x-2 ${
                      isDarkMode 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-blue-500 hover:bg-blue-600'
                    } transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span>{uiLabels.sending}</span>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>{uiLabels.sendMessage}</span>
                      </>
                    )}
                  </motion.button>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-3 bg-red-500 text-white rounded-lg text-center"
                    >
                      {error}
                    </motion.div>
                  )}
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface ContactInfoProps {
  icon: string;
  title: string;
  content: string;
  isDarkMode: boolean;
}

function ContactInfo({ icon, title, content, isDarkMode }: ContactInfoProps) {
  const Icon = resolveIcon(icon)
  return (
    <div className="flex items-start mb-6">
      <div className={`mr-4 p-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
        <Icon />
      </div>
      <div>
        <h3 className={`text-lg font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{content}</p>
      </div>
    </div>
  )
}

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required: boolean;
  isDarkMode: boolean;
}

function Input({ type, placeholder, value, onChange, required, isDarkMode }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full p-3 rounded-lg ${
        isDarkMode 
          ? 'bg-gray-700 text-white placeholder-gray-400' 
          : 'bg-gray-100 text-gray-900 placeholder-gray-500'
      } focus:outline-none focus:ring-2 focus:ring-blue-500`}
    />
  )
}