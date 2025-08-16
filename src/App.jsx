// src/App.jsx
import React, { useEffect, useState, Suspense, lazy, useCallback } from "react";
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import SquidGameBackground from "./components/SquidGameBackground";

// Lazy load heavy components to reduce initial bundle size
const About = lazy(() => import("./components/About"));
const Events = lazy(() => import("./components/Events"));
const Contact = lazy(() => import("./components/Contact"));

// Lightweight loading component
const ComponentLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="relative">
      <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState("welcome");
  const [isMobile, setIsMobile] = useState(false);
  const [componentsLoaded, setComponentsLoaded] = useState({
    about: false,
    events: false,
    contact: false
  });

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload components strategically
  useEffect(() => {
    // Preload About component after 1 second
    const aboutTimer = setTimeout(() => {
      import("./components/About").then(() => {
        setComponentsLoaded(prev => ({ ...prev, about: true }));
      });
    }, 1000);

    // Preload Events component after 2 seconds  
    const eventsTimer = setTimeout(() => {
      import("./components/Events").then(() => {
        setComponentsLoaded(prev => ({ ...prev, events: true }));
      });
    }, 2000);

    // Preload Contact component after 3 seconds
    const contactTimer = setTimeout(() => {
      import("./components/Contact").then(() => {
        setComponentsLoaded(prev => ({ ...prev, contact: true }));
      });
    }, 3000);

    return () => {
      clearTimeout(aboutTimer);
      clearTimeout(eventsTimer);
      clearTimeout(contactTimer);
    };
  }, []);

  // Optimized intersection observer with mobile-friendly thresholds
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.getAttribute("data-section"));
      }
    });
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section]");
    
    const observerOptions = {
      // Lower threshold for mobile for better responsiveness
      threshold: isMobile ? 0.3 : 0.55,
      // Reduced root margin on mobile
      rootMargin: isMobile ? "0px 0px -20% 0px" : "0px 0px -30% 0px"
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((sec) => observer.observe(sec));
    
    return () => observer.disconnect();
  }, [observerCallback, isMobile]);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      {/* Mobile-optimized background */}
      <div className="fixed inset-0 -z-10">
        <SquidGameBackground 
          activeSection={activeSection} 
          isMobile={isMobile}
          performanceMode={isMobile} // Enable performance mode on mobile
        />
      </div>

      {/* Navbar with mobile optimization flag */}
      <Navbar active={activeSection} isMobile={isMobile} />

      {/* Welcome section - Always loaded immediately */}
      <section
        id="welcome"
        data-section="welcome"
        className="min-h-screen flex items-center justify-center px-4 md:px-6 bg-transparent"
      >
        <Welcome />
      </section>

      {/* Lazy-loaded sections with mobile-optimized padding */}
      <section
        id="about"
        data-section="about"
        className="min-h-screen flex items-center justify-center px-4 md:px-6 bg-transparent"
      >
        <Suspense fallback={<ComponentLoader />}>
          <About />
        </Suspense>
      </section>

      <section
        id="events"
        data-section="events"
        className="min-h-screen flex items-center justify-center px-4 md:px-6 bg-transparent"
      >
        <Suspense fallback={<ComponentLoader />}>
          <Events />
        </Suspense>
      </section>

      <section
        id="contact"
        data-section="contact"
        className="min-h-screen flex items-center justify-center px-4 md:px-6 bg-transparent"
      >
        <Suspense fallback={<ComponentLoader />}>
          <Contact />
        </Suspense>
      </section>

      {/* Mobile scroll hint - only show on mobile */}
      {isMobile && activeSection === "welcome" && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      )}


    </div>
  );
}