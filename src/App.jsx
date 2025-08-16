// src/App.jsx
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Events from "./components/Events";
import Contact from "./components/Contact";
import SquidGameBackground from "./components/SquidGameBackground";

export default function App() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [isMobile, setIsMobile] = useState(false);
  const observerRef = useRef(null);

  // Detect mobile devices and handle resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Intersection Observer with performance optimizations
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");
    
    // Use intersection observer API v2 for better mobile performance
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Request animation frame for smoother state updates
            requestAnimationFrame(() => {
              setActiveSection(entry.target.getAttribute("data-section"));
            });
          }
        });
      },
      { 
        threshold: isMobile ? 0.35 : 0.55, // Lower threshold for mobile
        rootMargin: isMobile ? "0px 0px -40% 0px" : "0px 0px -30% 0px" 
      }
    );

    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isMobile]);

  // Animation for section transitions
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const renderSections = () => {
    const sections = [
      { id: "welcome", component: <Welcome isMobile={isMobile} /> },
      { id: "about", component: <About isMobile={isMobile} /> },
      { id: "events", component: <Events isMobile={isMobile} /> },
      { id: "contact", component: <Contact isMobile={isMobile} /> },
    ];

    return sections.map(({ id, component }) => (
      <motion.section
        key={id}
        id={id}
        data-section={id}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: isMobile ? "0px 0px -30% 0px" : "0px 0px -20% 0px" }}
        variants={sectionVariants}
        className={`min-h-screen flex items-center justify-center px-6 bg-transparent ${
          isMobile ? 'py-16' : 'py-24'
        }`}
      >
        {component}
      </motion.section>
    ));
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* Optimized background with mobile considerations */}
      <div className="fixed inset-0 -z-10">
        <SquidGameBackground 
          activeSection={activeSection} 
          isMobile={isMobile}
        />
      </div>

      {/* Navbar with mobile optimizations */}
      <Navbar 
        active={activeSection} 
        isMobile={isMobile} 
      />

      {/* Smooth animated sections */}
      {renderSections()}
    </div>
  );
}
