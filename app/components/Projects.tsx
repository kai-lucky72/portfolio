import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
import Image from 'next/image';
import data from '../data.json';

const { projects } = data;

interface ProjectsProps {
  isDarkMode: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ isDarkMode }) => {
  return (
    <section id="projects" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          className={`text-3xl font-bold mb-12 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {projects.title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.list.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    name: string;
    description: string;
    link: string;
    image: string;
    github: string;
    tags?: string[];
  };
  index: number;
  isDarkMode: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`rounded-2xl shadow-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } transition-all duration-300 hover:shadow-2xl border ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
    >
      <div className="relative h-64 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center p-8">
        <div className="relative w-full h-full">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-contain transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className={`absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}>
          <div className="flex space-x-6">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-blue-600 text-white shadow-lg"
              title="Live Demo"
            >
              <ExternalLink size={24} />
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-gray-800 text-white shadow-lg border border-gray-600"
              title="View Source"
            >
              <Github size={24} />
            </motion.a>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{project.name}</h3>
        <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {project.description}
        </p>
        
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span key={i} className={`text-xs px-3 py-1 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-blue-400' : 'bg-blue-50 text-blue-600'
              } font-medium`}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center font-bold ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
          whileHover={{ x: 5 }}
        >
          <Eye size={18} className="mr-2" />
          {data.uiLabels.viewProject}
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Projects;