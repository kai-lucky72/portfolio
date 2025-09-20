import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Eye } from 'lucide-react';
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
  };
  index: number;
  isDarkMode: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg shadow-lg overflow-hidden ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      } transition-all duration-300 hover:shadow-xl`}
    >
      <div className="relative">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${
          isDarkMode ? 'from-gray-900' : 'from-white'
        } opacity-0 hover:opacity-90 transition-opacity duration-300 flex items-end justify-center p-4`}>
          <div className="flex space-x-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
              } hover:bg-opacity-80 transition-colors duration-200`}
            >
              <ExternalLink size={20} />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-800'
              } hover:bg-opacity-80 transition-colors duration-200`}
            >
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className={`p-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
        <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {project.description}
        </p>
        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center ${
            isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
          }`}
          whileHover={{ x: 5 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Eye size={16} className="mr-2" />
          {data.uiLabels.viewProject}
        </motion.a>
      </div>
    </motion.div>
  );
};

export default Projects;