// src/App.jsx
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import About from "./components/About";
import Events from "./components/Events";
import Contact from "./components/Contact";
import SquidGameBackground from "./components/SquidGameBackground"; // 3D background

export default function App() {
  const [activeSection, setActiveSection] = useState("welcome");

  // Detect which section is in view
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute("data-section"));
          }
        });
      },
      { threshold: 0.55 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* ✅ Full-screen Squid Game Three.js background */}
      <div className="fixed inset-0 -z-10">
        <SquidGameBackground activeSection={activeSection} />
      </div>

      {/* Navbar */}
      <Navbar active={activeSection} />

      {/* Sections (transparent so 3D scene is visible) */}
      <section
        id="welcome"
        data-section="welcome"
        className="min-h-screen flex items-center justify-center px-6 bg-transparent"
      >
        <Welcome />
      </section>

      <section
        id="about"
        data-section="about"
        className="min-h-screen flex items-center justify-center px-6 bg-transparent"
      >
        <About />
      </section>

      <section
        id="events"
        data-section="events"
        className="min-h-screen flex items-center justify-center px-6 bg-transparent"
      >
        <Events />
      </section>

      <section
        id="contact"
        data-section="contact"
        className="min-h-screen flex items-center justify-center px-6 bg-transparent"
      >
        <Contact />
      </section>
    </div>
  );
}
