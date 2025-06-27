import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { Link } from "react-scroll";
import Navbar from "./Navbar/Navbar";

const ROLES = ["Web Developer x UI Designer"];
const PARTICLE_COUNT = 10;

const HeroSection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const INITIAL_DELTA = 200 - Math.random() * 100;
  const [delta, setDelta] = useState(INITIAL_DELTA);

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 10 + 2,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      })),
    []
  );

  useEffect(() => {
    let timeoutId: number;

    const tick = () => {
      const fullText = ROLES[roleIndex];

      setText((prev) => {
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        }
        return fullText.substring(0, prev.length + 1);
      });

      if (isDeleting) {
        setDelta((prev) => prev / 2);
      }
    };

    if (text === ROLES[roleIndex] && !isDeleting) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), 1500);
    } else if (text === "" && isDeleting) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
      setDelta(300);
    } else {
      timeoutId = window.setTimeout(tick, delta);
    }

    return () => window.clearTimeout(timeoutId);
  }, [text, isDeleting, roleIndex, delta]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col-reverse md:flex-row items-center md:py-0 py-32 justify-center overflow-hidden bg-[url('/buildings.png')] bg-center bg-cover md:bg-fixed bg-scroll"
    >
      <Navbar />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/50 z-10" />

      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            top: particle.top,
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}

      <div className="relative z-40 text-center md:text-left px-4 sm:px-6 lg:px-8 max-w-2xl md:mr-12 mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-6xl font-bold md:mb-6 mb-2 gradient-text"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            SKYLAR HUANG
          </motion.h1>

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-200 overflow-hidden">
              <span className="inline-block whitespace-nowrap">
                <span className="text-white font-semibold">{text}</span>
                <span className="ml-1 border-r-2 border-white animate-blink">
                  |
                </span>
              </span>
            </h2>

            <p className="mt-6 text-gray-200 max-w-3xl md:text-lg leading-relaxed">
              Hi, I’m Skylar — a programmer and UI designer with a passion for
              clean, intuitive digital experiences. As a developer, I love
              bringing ideas to life through elegant, responsive websites. As a
              UI designer, I focus on creating interfaces that are not only
              visually appealing but also user-centered and functional. I'm
              always curious, driven to learn, and excited to explore new tools
              and creative processes. Recently, I’ve also been experimenting
              with stop-motion animation as a playful way to tell visual
              stories.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="designs"
              smooth={true}
              className="px-8 cursor-pointer py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-medium rounded-full hover:from-primary-800 hover:to-secondary-800 transition-all transform hover:-translate-y-1 shadow-lg shadow-purple-500/30"
            >
              Designs Story
            </Link>
            <Link
              to="developments"
              smooth={true}
              className="px-8 py-3 cursor-pointer bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all"
            >
              See Code
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-40">
        <motion.div
          className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full z-10" />
          <img
            src="/greeting.gif"
            alt="SKYLAR HUANG"
            className="w-full h-full object-cover relative z-20"
            loading="lazy"
          />

          <motion.div
            className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 filter blur-xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 filter blur-xl opacity-30"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -15, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>

        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          animate={{
            boxShadow: [
              "0 0 0 0px rgba(168, 85, 247, 0.3)",
              "0 0 0 15px rgba(168, 85, 247, 0.1)",
              "0 0 0 30px rgba(168, 85, 247, 0.0)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex-col items-center z-40 md:flex hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-gray-300 mb-2 text-sm">Scroll down</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
