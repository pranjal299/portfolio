import React, { useState, useEffect, useRef } from 'react';
import { GithubIcon, LinkedinIcon, MailIcon, ExternalLinkIcon, CodeIcon, LayoutIcon, DatabaseIcon, BookOpenIcon, ServerIcon, CloudIcon, FileTextIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectsCarousel from './ProjectsCarousel'; // Add this import

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const sections = ['home', 'about', 'resume', 'projects', 'publications', 'contact'];

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  useEffect(() => {
    const handleScroll = () => {
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

const scrollTo = (section) => {
  if (section === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    const element = document.getElementById(section);
    if (element) {
      const yOffset = -20; // Adjust this value to fine-tune scrolling position
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
  setIsMenuOpen(false);
};

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  return (
    <div className="min-h-screen text-gray-800 font-sans relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-pattern opacity-5"></div>

      <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 shadow-sm backdrop-blur-sm z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <motion.h1 
              className="text-2xl font-light tracking-wider text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              PR
            </motion.h1>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
            <ul className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <li key={section}>
                  <button
                    onClick={() => scrollTo(section)}
                    className={`px-2 py-1 text-sm uppercase tracking-wider transition-all duration-300 ${
                      activeSection === section
                        ? 'text-gray-800 border-b-2 border-gray-800'
                        : 'text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-400'
                    }`}
                  >
                    {section}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <motion.div 
          ref={menuRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-white bg-opacity-95 backdrop-blur-lg flex items-center justify-center"
        >
          <ul className="text-center">
            {sections.map((section) => (
              <li key={section} className="mb-6">
                <button
                  onClick={() => scrollTo(section)}
                  className={`px-4 py-2 text-lg uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section
                      ? 'text-gray-800 border-b-2 border-gray-800'
                      : 'text-gray-500 hover:text-gray-800 hover:border-b-2 hover:border-gray-400'
                  }`}
                >
                  {section}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <main className="pt-20 relative z-10">
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div
  className="text-center pb-24"  // Added padding-bottom to raise the content
  initial="hidden"
  animate="visible"
  style={{ opacity, scale }}
  variants={{
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  }}
>
            <motion.h1 variants={fadeInUpVariants} className="text-6xl font-light mb-4 text-gray-800 tracking-wide">
              Pranjal Ranjan
            </motion.h1>
            <motion.p variants={fadeInUpVariants} className="text-xl text-gray-600 mb-8 tracking-wide">Data Engineer</motion.p>
            <motion.button
              variants={buttonVariants}
              onClick={() => scrollTo('about')}
              className="bg-gray-800 text-white font-light py-3 px-8 rounded-none transition-all duration-300 hover:bg-gray-700 hover:shadow-lg"
            >
              Explore My Work
            </motion.button>
          </motion.div>
        </section>

        <section id="about" className="min-h-screen flex items-center justify-center py-20 relative">
          <motion.div
            className="max-w-4xl text-center px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
          >
            <motion.h2 variants={fadeInUpVariants} className="text-4xl font-light mb-12 text-gray-800 tracking-wide">About Me</motion.h2>
            <motion.p variants={fadeInUpVariants} className="text-lg mb-12 leading-relaxed text-gray-600">
              I'm a passionate Data Engineer with a Master's degree in Computer Engineering (specializing in Data Science) from Virginia Tech. My expertise spans across modern big data technologies, cloud platforms, and machine learning techniques, allowing me to architect scalable data solutions and derive actionable insights from complex datasets.
            </motion.p>
            <motion.div variants={fadeInUpVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                { title: "Big Data", skills: "Spark, Kafka, Hadoop", icon: DatabaseIcon },
                { title: "Cloud & DevOps", skills: "Azure, AWS, Docker, Kubernetes", icon: CloudIcon },
                { title: "Data Science", skills: "Python, TensorFlow, PyTorch", icon: CodeIcon }
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <skill.icon size={36} className="text-gray-800 mb-4 mx-auto" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{skill.title}</h3>
                  <p className="text-gray-600">{skill.skills}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="resume" className="min-h-screen flex items-center justify-center py-20 relative">
           <motion.div
             className="max-w-4xl text-center px-4"
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={{
               hidden: { opacity: 0 },
               visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
             }}
           >
             <motion.h2 variants={fadeInUpVariants} className="text-4xl font-light mb-12 text-gray-800 tracking-wide">Resume</motion.h2>
             <motion.div variants={fadeInUpVariants} className="bg-white p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
               <FileTextIcon size={48} className="text-gray-800 mb-6 mx-auto" />
               <p className="text-lg mb-6 text-gray-600">View or download my complete resume to learn more about my professional experience and skills.</p>
               <a
                 href={`${process.env.PUBLIC_URL}/Pranjal_Resume_DE_1.pdf`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="bg-gray-800 text-white font-light py-3 px-8 rounded-none transition-all duration-300 hover:bg-gray-700 hover:shadow-lg inline-flex items-center"
               >
                 View Resume <ExternalLinkIcon size={18} className="ml-2" />
               </a>
             </motion.div>
           </motion.div>
         </section>

        <ProjectsCarousel />

        <section id="publications" className="min-h-screen py-20 relative">
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl font-light text-center mb-16 text-gray-800 tracking-wide"
            >
              Publications
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4 max-w-4xl mx-auto">
              {[
                {
                  title: "Improved Generalizability of Deep-Fakes Detection using Transfer Learning Based CNN Framework",
                  journal: "2020 3rd International Conference on Information and Computer Technologies (ICICT)",
                  year: 2020,
                  link: "https://ieeexplore.ieee.org/abstract/document/9092019"
                },
                {
                  title: "U-net based Multiresolution Analysis framework for segmentation of remotely sensed images",
                  journal: "2020 International Conference on Artificial Intelligence and Signal Processing (AISP)",
                  year: 2022,
                  link: "https://ieeexplore.ieee.org/abstract/document/9073131"
                },
                {
                  title: "Building Footprint Extraction from Aerial Images using Multiresolution Analysis Based Transfer Learning",
                  journal: "2020 IEEE 17th India Council International Conference (INDICON)",
                  year: 2020,
                  link: "https://ieeexplore.ieee.org/abstract/document/9342581"
                },
                {
                  title: "Image Processing based ML Framework for Leaf Classification and Disease Detection",
                  journal: "2022 International Conference on Signal and Information Processing (IConSIP)",
                  year: 2022,
                  link: "https://ieeexplore.ieee.org/abstract/document/10007506"
                }
              ].map((publication, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <BookOpenIcon size={24} className="text-gray-800 mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{publication.title}</h3>
                  <p className="text-gray-600 mb-2">{publication.journal}</p>
                  <p className="text-gray-500 mb-4">{publication.year}</p>
                  <a
                    href={publication.link}
                    className="text-gray-800 hover:text-gray-600 transition-colors duration-300 inline-flex items-center font-semibold group"
                  >
                    Read More <ExternalLinkIcon size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex items-center justify-center relative bg-white">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
            }}
          >
            <motion.h2 variants={fadeInUpVariants} className="text-4xl font-light mb-12 text-gray-800 tracking-wide">Get in Touch</motion.h2>
            <motion.div variants={fadeInUpVariants} className="flex justify-center space-x-8">
              {[
                { icon: GithubIcon, link: "https://github.com/pranjal299", label: "GitHub" },
                { icon: LinkedinIcon, link: "https://www.linkedin.com/in/pranjalranjan/", label: "LinkedIn" },
                { icon: MailIcon, link: "mailto:pranjalranjan@vt.edu", label: "Email" }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  aria-label={social.label}
                  className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={32} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-100 text-gray-600 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Pranjal Ranjan. All rights reserved.</p>
          <p className="mt-2 text-sm">
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;