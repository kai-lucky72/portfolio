"use client"

import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from './components/About';
import Services from "./components/Services";
import Skills from "./components/Skills";
import CVRoadmap from "./components/CVRoadmap";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import { useEffect } from "react";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
          element.classList.add("animate-fadeInUp");
        }
      });
    };

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll();

    return () => window.removeEventListener("scroll", animateOnScroll);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} px-3`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Skills isDarkMode={isDarkMode} />
      <CVRoadmap isDarkMode={isDarkMode} />
      <Projects isDarkMode={isDarkMode}/>
      <Blog isDarkMode={isDarkMode}/>
      <Testimonials isDarkMode={isDarkMode}/>
      <Contact isDarkMode={isDarkMode}/>
      <Footer isDarkMode={isDarkMode}/>
    </div>
  );
}
