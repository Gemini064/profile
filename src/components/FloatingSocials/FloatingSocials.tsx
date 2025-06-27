import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Github, X, MessageCircleCode } from 'lucide-react';

const FloatingSocials: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const socialLinks = [
    {
      icon: Mail,
      href: 'mailto:yutien.huang064@gmail.com',
      color: 'from-primary-400 to-primary-600',
      label: 'Email'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/skylar64/',
      color: 'from-secondary-400 to-secondary-600',
      label: 'LinkedIn'
    },
    {
      icon: Github,
      href: 'https://github.com/Gemini064',
      color: 'from-accent-400 to-accent-600',
      label: 'GitHub'
    },
  ];

  return (
    <>
      <motion.div
        ref={containerRef}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col space-y-6"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={`desktop-${index}`}
              href={social.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-item group relative w-12 h-12 rounded-full bg-gradient-to-br ${social.color} shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: index * 0.2,
                duration: 0.6,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 25px rgba(249, 197, 209, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
              aria-label={social.label}
            >
              <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-white/10 to-transparent rotate-45 scale-0 group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Mobile View - Expandable Icons */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            className="fixed right-6 bottom-6 z-50 lg:hidden"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex flex-col-reverse items-end gap-3"
              layout
            >
              <AnimatePresence>
                {isExpanded && socialLinks.map((social, index) => (
                  <motion.a
                    key={`mobile-${index}`}
                    href={social.href || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social-item group relative w-14 h-14 rounded-full bg-gradient-to-br ${social.color} shadow-lg flex items-center justify-center`}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ 
                      duration: 0.2,
                      delay: index * 0.05
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                    onClick={() => setIsExpanded(false)}
                  >
                    <social.icon className="w-6 h-6 text-white" />
                  </motion.a>
                ))}
              </AnimatePresence>

              <motion.button
                className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 shadow-xl flex items-center justify-center focus:outline-none"
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isExpanded ? "Collapse social links" : "Expand social links"}
                layout
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isExpanded ? (
                    <X className="w-6 h-6 text-white" />
                  ) : (
                  <MessageCircleCode className="w-6 h-6 text-white" />
                  )}
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingSocials;