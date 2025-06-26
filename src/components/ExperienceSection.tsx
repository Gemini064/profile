import React, { useRef, useCallback, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "motion/react";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { experienceData as EXPERIENCES } from "../data/experienceData";

const TiltCard: React.FC<{ children: React.ReactNode }> = React.memo(
  ({ children }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const springConfig = useMemo(() => ({ damping: 15, stiffness: 300 }), []);

    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width * 0.5;
        const centerY = rect.top + rect.height * 0.5;
        const deltaX = ((e.clientX - centerX) / rect.width) * 15;
        const deltaY = ((e.clientY - centerY) / rect.height) * 15;

        rotateX.set(-deltaY);
        rotateY.set(deltaX);
      },
      [rotateX, rotateY]
    );

    const handleMouseLeave = useCallback(() => {
      animate(rotateX, 0, { duration: 0.7 });
      animate(rotateY, 0, { duration: 0.7 });
    }, [rotateX, rotateY]);

    return (
      <motion.div
        ref={cardRef}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 1000,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    );
  }
);

const ExperienceSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="py-20 relative overflow-hidden bg-[url(/experience.png)] bg-cover bg-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50 z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text sm:mb-6 mb-2">
            Experience
          </h2>
          <p className="sm:text-lg text-white max-w-2xl mx-auto font-normal">
            My professional journey in frontend development and technology
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary-200 to-secondary-200 rounded-full">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-primary-600 to-secondary-600 rounded-full origin-top"
              style={{ scaleY: lineScaleY }}
            />
          </div>

          <div className="md:space-y-16 space-y-52 pt-10 sm:pt-0">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={`exp-${index}`}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -100 : 100,
                  scale: 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.5,
                    delay: index * 0.2,
                    duration: 0.8,
                  },
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="absolute left-1/2 -top-14 md:top-auto transform -translate-x-1/2 z-20 cursor-default select-none">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${exp.color} flex items-center justify-center text-2xl shadow-lg`}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 30px rgba(249, 197, 209, 0.6)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {exp.icon}
                  </motion.div>
                </div>
                <div
                  className={`w-full lg:w-5/12 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <TiltCard>
                    <motion.div
                      className="glassmorphism rounded-2xl sm:p-6 p-3 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-default"
                      whileHover={{
                        y: -5,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:gradient-text transition-all duration-300">
                          {exp.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-white/90 mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-secondary-300 font-medium">
                          <span>{exp.company}</span>
                          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>

                      <p className="text-white/90 mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-2">
                        <h4 className="font-medium text-white">
                          Key Achievements:
                        </h4>
                        <ul className="space-y-1">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li
                              key={`ach-${index}-${achIndex}`}
                              className="flex items-start space-x-2 text-sm text-white/90"
                            >
                              <span className="text-primary-300 mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="absolute -top-3 -right-3 w-12 h-12 glassmorphism rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.span
                          className="text-lg block"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {exp.icon}
                        </motion.span>
                      </div>
                    </motion.div>
                  </TiltCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ExperienceSection);
