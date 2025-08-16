// src/components/Welcome.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Welcome({ accent = "#FF0050" }) {
  const letters = "STROM 2K25".split("");

  const glowPulse = {
    textShadow: [
      "0 0 12px rgba(255,0,80,0.5)",
      "0 0 24px rgba(255,0,80,1)",
      "0 0 12px rgba(255,0,80,0.5)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  };

  const floatAnim = (duration, offset = 0) => ({
    y: [0, -10, 0], // smaller float
    rotate: [0, 4, -4, 0], // lighter rotation
    opacity: [0.7, 1, 0.7],
    transition: { duration, repeat: Infinity, ease: "easeInOut", delay: offset }
  });

  return (
    <section
      id="welcome"
      className="relative w-full text-center min-h-screen flex flex-col justify-center items-center px-4"
    >
      {/* Floating Shapes - Optimized for mobile */}
      <motion.div
        className="absolute left-[10%] top-[22%] w-8 h-8 sm:w-12 sm:h-12 rounded-full 
                   border-2 sm:border-4 border-pink-500 
                   shadow-[0_0_10px_rgba(255,0,80,0.6)] sm:shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(8)}
      />
      <motion.div
        className="absolute right-[12%] top-[28%] w-0 h-0 
                   border-l-[20px] border-r-[20px] sm:border-l-[30px] sm:border-r-[30px] 
                   border-b-[35px] sm:border-b-[50px] 
                   border-l-transparent border-r-transparent border-b-pink-500 
                   drop-shadow-[0_0_10px_rgba(255,0,80,0.6)] sm:drop-shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(9, 0.5)}
      />
      <motion.div
        className="absolute left-[48%] bottom-[18%] w-10 h-10 sm:w-14 sm:h-14 
                   border-2 sm:border-4 border-pink-500 
                   shadow-[0_0_10px_rgba(255,0,80,0.6)] sm:shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(10, 1)}
      />

      {/* Logo */}
      <motion.img
        src="/logos/strom-logo.png"
        alt="STROM"
        className="h-32 sm:h-40 md:h-56 lg:h-72 mb-6 
                   drop-shadow-[0_0_25px_rgba(255,0,80,0.9)] relative z-10 mx-auto"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Title */}
      <h1 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold 
                     tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] 
                     relative z-10 mb-4">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 50, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              delay: 0.07 * i,
              type: "spring",
              stiffness: 180,
              damping: 20
            }}
            whileInView={glowPulse}
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </h1>

      {/* Description */}
      <motion.p
        className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white 
                   max-w-md sm:max-w-xl md:max-w-2xl mx-auto relative z-10 
                   leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Loyola-ICAM College of Engineering & Technology presents its flagship
        technical symposium — a celebration of innovation, teamwork, and
        technical excellence.
      </motion.p>

      {/* Single Button */}
      <motion.div
        className="mt-8 sm:mt-10 flex items-center justify-center relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <motion.a
          href="#events"
          className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg md:text-xl font-bold rounded-full 
                     bg-pink-600 text-white shadow-[0_0_20px_rgba(255,0,80,0.8)] 
                     border border-pink-400 tracking-wider"
          style={{ ["--accent"]: accent }}
          whileHover={{
            scale: 1.1,
            boxShadow:
              "0 0 35px rgba(255,0,80,1), 0 0 60px rgba(255,0,80,0.7)"
          }}
          animate={{
            boxShadow: [
              "0 0 15px rgba(255,0,80,0.6)",
              "0 0 30px rgba(255,0,80,1)",
              "0 0 15px rgba(255,0,80,0.6)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Explore Events
        </motion.a>
      </motion.div>
    </section>
  );
}
