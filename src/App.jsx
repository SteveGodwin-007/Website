// src/App.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Events from "./components/Events";
import Contact from "./components/Contact";

export default function App() {
  const [activeSection, setActiveSection] = useState("welcome");

  // 🎨 Color palette per section
  const sectionColors = {
    welcome: { bg: "#0f0c29", accent: "#ff007f" }, // neon pink
    about: { bg: "#1e0037", accent: "#7d5fff" },   // purple
    events: { bg: "#000000", accent: "#ff3c00" },  // deep black + orange
    contact: { bg: "#002b25", accent: "#00ffa3" }  // teal
  };

  // 📌 Track which section is visible
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const { bg, accent } = sectionColors[activeSection] || sectionColors.welcome;

  // 🔺 Shape configurations (easy to extend)
  const shapes = [
    {
      type: "circle",
      style: { width: "18rem", height: "18rem", borderRadius: "50%" },
      animate: { x: [0, 50, -50, 0], y: [0, -50, 50, 0], rotate: [0, 45, 90, 0] },
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut" }
    },
    {
      type: "triangle",
      style: {
        width: 0,
        height: 0,
        borderLeft: "60px solid transparent",
        borderRight: "60px solid transparent",
        borderBottom: `100px solid ${accent}`,
        top: "30%",
        left: "70%",
        filter: `drop-shadow(0 0 20px ${accent})`
      },
      animate: { rotate: [0, 360], scale: [1, 1.2, 1] },
      transition: { duration: 20, repeat: Infinity, ease: "linear" }
    },
    {
      type: "square",
      style: {
        width: "8rem",
        height: "8rem",
        border: `3px solid ${accent}`,
        top: "60%",
        left: "20%",
        boxShadow: `0 0 20px ${accent}`
      },
      animate: { rotate: [0, 90, 180, 360], scale: [1, 1.3, 1] },
      transition: { duration: 18, repeat: Infinity, ease: "easeInOut" }
    }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background transition */}
      <motion.div
        className="fixed inset-0 -z-10"
        style={{ background: bg }}
        animate={{ backgroundColor: bg }}
        transition={{ duration: 1.2 }}
      />

      {/* Animated Shapes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={accent}
          className="fixed inset-0 pointer-events-none -z-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
        >
          {shapes.map((shape, i) => (
            <motion.div
              key={shape.type + i}
              className="absolute"
              style={{ background: shape.type === "circle" ? accent : "transparent", ...shape.style }}
              animate={shape.animate}
              transition={shape.transition}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Sections */}
      <section id="welcome" className="min-h-screen flex items-center justify-center">
        <Welcome />
      </section>
      <section id="about" className="min-h-screen flex items-center justify-center">
        <About />
      </section>
      <section id="events" className="min-h-screen flex items-center justify-center">
        <Events />
      </section>
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <Contact />
      </section>
    </div>
  );
}