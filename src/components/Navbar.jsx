// src/components/Navbar.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaInfoCircle, FaCalendarAlt, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";

const links = [
  { id: "welcome", label: "Welcome", icon: <FaHome />, shape: "◯" },
  { id: "about", label: "About", icon: <FaInfoCircle />, shape: "△" },
  { id: "events", label: "Events", icon: <FaCalendarAlt />, shape: "□" },
  { id: "contact", label: "Contact", icon: <FaEnvelope />, shape: "◯" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-2 sm:px-4 py-2"
      >
        <div className="flex items-center justify-between w-full max-w-6xl 
          backdrop-blur-lg bg-black/50 rounded-full border border-pink-500/40 
          shadow-[0_0_20px_rgba(255,0,80,0.6)] px-4 sm:px-6 py-2 sm:py-3">

          {/* Logo + Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="/logos/licet-logo.jpeg"
              alt="LICET"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-pink-500 shadow-[0_0_10px_rgba(255,0,80,0.7)]"
            />
            <div className="leading-tight">
              <div className="text-base sm:text-lg font-bold tracking-wide text-pink-400 drop-shadow-[0_0_5px_rgba(255,0,80,0.8)]">
                STROM 2K25
              </div>
              <div className="hidden sm:block text-xs text-gray-300">
                Loyola-ICAM College of Engineering & Technology
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden sm:flex items-center space-x-6">
            {links.map((l, index) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                className="flex items-center gap-2 text-sm text-white hover:text-pink-400 transition-colors relative"
                whileHover={{ scale: 1.1 }}
              >
                {l.icon}
                {l.label}
                <motion.span
                  className="ml-1 text-pink-500 drop-shadow-[0_0_8px_rgba(255,0,80,0.8)]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {l.shape}
                </motion.span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="sm:hidden text-pink-400 text-2xl focus:outline-none"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center space-y-10 text-white"
          >
            <button
              className="absolute top-5 right-5 text-pink-400 text-3xl"
              onClick={() => setMenuOpen(false)}
            >
              <FaTimes />
            </button>

            {links.map((l, index) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-2xl font-bold tracking-widest hover:text-pink-400 transition-colors"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                {l.icon}
                {l.label}
                <motion.span
                  className="ml-2 text-pink-500 drop-shadow-[0_0_15px_rgba(255,0,80,0.9)]"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                >
                  {l.shape}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
