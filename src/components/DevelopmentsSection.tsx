import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { motion, useAnimation, type TargetAndTransition } from "motion/react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { DevelopmentWorks as works } from "../data/developmentWorks";

const DevelopmentsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      controls.start({
        y: [0, -15, 0],
        transition: { duration: 3, ease: "easeInOut" }
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [controls, isVisible]);

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % works.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + works.length) % works.length);
  }, []);

  const calculateStyle = useCallback((index: number): TargetAndTransition => {
    const total = works.length;
    let position = index - currentIndex;

    if (position > total / 2) position -= total;
    else if (position < -total / 2) position += total;

    const absPosition = Math.abs(position);

    if (absPosition > 2) {
      return {
        opacity: 0,
        scale: 0.7,
        zIndex: 0,
        display: "none",
      };
    }

    return {
      opacity: 1 - absPosition * 0.3,
      scale: 1 - absPosition * 0.1,
      rotateY: position * 15,
      x: position * 200,
      zIndex: position === 0 ? 20 : 10 - absPosition,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    };
  }, [currentIndex]);


  const visibleIndices = useMemo(() => {
    return [-2, -1, 0, 1, 2].map(offset => 
      (currentIndex + offset + works.length) % works.length
    );
  }, [currentIndex]);

  return (
    <section
      id="developments"
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-[url(/project.png)] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50 z-10"/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Development Works
          </h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            A collection of projects that showcase my skills in frontend
            development
          </p>
        </motion.div>

 
        <div className="relative h-[550px] overflow-visible">
          <div
            ref={containerRef}
            className="relative w-full h-full flex items-center justify-center"
            style={{ perspective: "1200px" }}
          >
            {visibleIndices.map(index => {
              const work = works[index];
              const position = index - currentIndex;
              const style = calculateStyle(index);

              return (
                <motion.div
                  key={work.id}
                  className="absolute work-card sm:w-80 w-72 sm:h-[500px] h-[450px]"
                  animate={style}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={position === 0 ? { scale: 1.03 } : {}}
                  onClick={() => position !== 0 && setCurrentIndex(index)}
                >
                  <motion.div className="h-full" animate={controls}>
                    <div className="relative h-full glassmorphism rounded-3xl overflow-hidden group cursor-pointer">
                      <div className="relative sm:h-60 h-48 overflow-hidden">
                        <img
                          src={work.image}
                          alt={work.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {work.featured && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-primary-400 to-secondary-400 text-white text-xs font-medium rounded-full">
                            Featured
                          </div>
                        )}

                        <motion.a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <div className="flex items-center sm:space-x-2 space-x-1 px-2 sm:px-4 py-2 glassmorphism rounded-full text-white text-sm font-medium">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Project</span>
                          </div>
                        </motion.a>
                      </div>

                      <div className="p-6 h-60 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-medium text-secondary-300 uppercase tracking-wide">
                            {work.category}
                          </span>
                          <h3 className="text-xl font-semibold text-white mt-2 mb-3 group-hover:gradient-text transition-all duration-300">
                            {work.title}
                          </h3>
                          <p className="text-white/90 text-sm leading-relaxed">
                            {work.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {work.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-neutral-100 text-black text-xs rounded-md hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                  
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-400/10 via-transparent to-secondary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            className="absolute sm:left-4 left-0 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            className="absolute sm:right-4 right-0 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {works.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-primary-700 to-secondary-700 w-8"
                  : "bg-white"
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(DevelopmentsSection);

