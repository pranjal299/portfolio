import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon, LayoutIcon, CodeIcon, DatabaseIcon, CloudIcon, ServerIcon } from 'lucide-react';

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    { title: "E-commerce Platform", desc: "A full-featured online store with React and Node.js", icon: LayoutIcon },
    { title: "Task Management App", desc: "Efficient todo app with drag-and-drop functionality", icon: CodeIcon },
    { title: "Data Visualization Dashboard", desc: "Interactive charts and graphs using D3.js", icon: DatabaseIcon },
    { title: "Cloud-based File Storage", desc: "Secure file storage and sharing solution", icon: CloudIcon },
    { title: "AI-powered Chatbot", desc: "Customer service bot with natural language processing", icon: ServerIcon },
    { title: "Fitness Tracking Mobile App", desc: "iOS and Android app for tracking workouts and nutrition", icon: LayoutIcon },
    { title: "Social Media Analytics Tool", desc: "Real-time analytics for social media performance", icon: DatabaseIcon },
    { title: "Virtual Reality Game", desc: "Immersive VR experience built with Unity", icon: CodeIcon },
    { title: "IoT Home Automation System", desc: "Smart home control using IoT devices", icon: CloudIcon }
  ];

  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      Math.min(prevIndex + 3, projects.length - 3)
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 3, 0));
  };

  return (
    <section id="projects" className="min-h-screen py-20 relative bg-white">
      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-light text-center mb-16 text-gray-800 tracking-wide"
        >
          My Projects
        </motion.h2>
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {projects.slice(currentIndex, currentIndex + 3).map((project, index) => (
              <motion.div
                key={currentIndex + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md group"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center p-6 group-hover:bg-gray-200 transition-colors duration-300">
                  <project.icon size={48} className="text-gray-800 group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.desc}</p>
                  <a
                    href="#"
                    className="text-gray-800 hover:text-gray-600 transition-colors duration-300 inline-flex items-center font-semibold group"
                  >
                    View Project <ExternalLinkIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
          {currentIndex > 0 && (
            <button
              onClick={prevProject}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md text-gray-800 hover:text-gray-600 transition-colors duration-300"
              aria-label="Previous projects"
            >
              <ChevronLeftIcon size={24} />
            </button>
          )}
          {currentIndex < projects.length - 3 && (
            <button
              onClick={nextProject}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md text-gray-800 hover:text-gray-600 transition-colors duration-300"
              aria-label="Next projects"
            >
              <ChevronRightIcon size={24} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;