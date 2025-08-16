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
    y: [0, -15, 0],
    rotate: [0, 6, -6, 0],
    opacity: [0.6, 1, 0.6],
    transition: { duration, repeat: Infinity, ease: "easeInOut", delay: offset }
  });

  return (
    <section
      id="welcome"
      className="relative w-full text-center min-h-screen flex flex-col justify-center items-center px-4"
    >
      {/* Floating Shapes */}
      <motion.div
        className="absolute left-[10%] top-[22%] w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-pink-500 shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(6)}
      />
      <motion.div
        className="absolute right-[12%] top-[28%] w-0 h-0 border-l-[30px] border-r-[30px] sm:border-l-[40px] sm:border-r-[40px] border-b-[50px] sm:border-b-[70px] border-l-transparent border-r-transparent border-b-pink-500 drop-shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(7, 0.5)}
      />
      <motion.div
        className="absolute left-[48%] bottom-[18%] w-14 h-14 sm:w-20 sm:h-20 border-4 border-pink-500 shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(8, 1)}
      />

      {/* Logo */}
      <motion.img
        src="/logos/strom-logo.png"
        alt="STROM"
        className="h-40 sm:h-56 md:h-72 lg:h-[24rem] mb-6 drop-shadow-[0_0_40px_rgba(255,0,80,1)] relative z-10 mx-auto"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9 }}
        whileHover={{ scale: 1.05 }}
      />

      {/* Title */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-[0.15em] sm:tracking-[0.25em] md:tracking-[0.35em] relative z-10 mb-4">
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
        className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white max-w-xl sm:max-w-2xl mx-auto relative z-10 leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Loyola-ICAM College of Engineering & Technology presents its flagship
        technical symposium — a celebration of innovation, teamwork, and
        technical excellence.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <a
          href="#events"
          className="btn-neon px-6 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto text-center"
          style={{ ["--accent"]: accent }}
        >
          Explore Events
        </a>
        <a
          href="#contact"
          className="btn-outline px-6 py-3 text-base sm:text-lg font-semibold w-full sm:w-auto text-center"
        >
          Join the Game
        </a>
      </motion.div>
    </section>
  );
}
