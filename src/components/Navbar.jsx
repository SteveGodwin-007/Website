// src/components/Navbar.jsx
import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaInfoCircle, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const links = [
  { id: "welcome", label: "Welcome", icon: <FaHome />, shape: "◯" },
  { id: "about", label: "About", icon: <FaInfoCircle />, shape: "△" },
  { id: "events", label: "Events", icon: <FaCalendarAlt />, shape: "□" },
  { id: "contact", label: "Contact", icon: <FaEnvelope />, shape: "◯" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-2"
    >
      <div className="flex items-center justify-between w-full max-w-6xl backdrop-blur-lg bg-black/50 rounded-full border border-pink-500/40 shadow-[0_0_20px_rgba(255,0,80,0.6)] px-6 py-3">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3">
          <img
            src="/logos/licet-logo.jpeg"
            alt="LICET"
            className="w-12 h-12 rounded-full border-2 border-pink-500 shadow-[0_0_10px_rgba(255,0,80,0.7)]"
          />
          <div>
            <div className="text-lg font-bold tracking-wide text-pink-400 drop-shadow-[0_0_5px_rgba(255,0,80,0.8)]">
              STROM 2K25
            </div>
            <div className="text-xs text-gray-300">
              Loyola-ICAM College of Engineering & Technology
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex items-center space-x-6">
          {links.map((l, index) => (
            <motion.a
              key={l.id}
              href={`#${l.id}`}
              className="flex items-center gap-2 text-sm text-white hover:text-pink-400 transition-colors relative"
              whileHover={{ scale: 1.1 }}
            >
              {/* Icon */}
              {l.icon}
              {l.label}
              {/* Squid Game Shape */}
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
      </div>
    </motion.nav>
  );
}
