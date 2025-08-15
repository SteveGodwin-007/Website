// src/components/Welcome.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Welcome({ accent = "#FF0050" }) {
  const letters = "STROM 2K25".split("");

  const glowPulse = {
    textShadow: [
      "0 0 15px rgba(255,0,80,0.6)",
      "0 0 25px rgba(255,0,80,1)",
      "0 0 15px rgba(255,0,80,0.6)"
    ],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
  };

  const floatAnim = (duration) => ({
    y: [0, -20, 0],
    rotate: [0, 8, -8, 0],
    opacity: [0.6, 1, 0.6],
    transition: { duration, repeat: Infinity, ease: "easeInOut" }
  });

  return (
    <div className="relative w-full max-w-6xl text-center pt-28 md:pt-8 bg-transparent">
      {/* Floating Squid Game Shapes */}
      <motion.div
        className="absolute left-[15%] top-[25%] w-20 h-20 rounded-full border-4 border-pink-500 shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(6)}
      />
      <motion.div
        className="absolute right-[18%] top-[20%] w-0 h-0 border-l-[40px] border-r-[40px] border-b-[70px] border-l-transparent border-r-transparent border-b-pink-500 drop-shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(7)}
      />
      <motion.div
        className="absolute left-[50%] bottom-[20%] w-20 h-20 border-4 border-pink-500 shadow-[0_0_20px_rgba(255,0,80,0.7)] -z-10"
        animate={floatAnim(8)}
      />

      {/* Logo */}
      <motion.img
        src="/logos/strom-logo.png"
        alt="STROM"
        className="h-72 md:h-[24rem] mb-6 drop-shadow-[0_0_40px_rgba(255,0,80,1)] relative z-10 mx-auto"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9 }}
        whileHover={{ scale: 1.1 }}
      />

      {/* Animated Title */}
      <h1 className="font-display text-5xl md:text-8xl font-extrabold tracking-[0.2em] md:tracking-[0.35em] relative z-10 mb-4">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block"
            initial={{ y: 40, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{
              delay: 0.05 * i,
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
        className="mt-6 text-lg md:text-xl text-white max-w-2xl mx-auto relative z-10 leading-relaxed drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Loyola-ICAM College of Engineering & Technology presents its flagship technical symposium —
        a celebration of innovation, teamwork, and technical excellence.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="mt-10 flex items-center justify-center gap-6 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <a
          href="#events"
          className="btn-neon px-6 py-3 text-lg font-semibold"
          style={{ ["--accent"]: accent }}
        >
          Explore Events
        </a>
        <a href="#contact" className="btn-outline px-6 py-3 text-lg font-semibold">
          Join the Game
        </a>
      </motion.div>
    </div>
  );
}
