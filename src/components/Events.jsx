// src/components/Events.jsx
import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, useInView } from "framer-motion";
import EventCard from "./EventCard";
import { events } from "../data/events";

export default function Events() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  
  // Performance optimizations
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [visibleParticles, setVisibleParticles] = useState([]);

  // Device detection and optimization
  useEffect(() => {
    const checkDevice = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
      const lowEnd = navigator.hardwareConcurrency <= 4 || /Android.*Chrome\/[0-9]{2}\./i.test(navigator.userAgent);
      setIsMobile(mobile);
      setIsLowEnd(lowEnd);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Optimized cursor trail with throttling
  const lastMouseMove = useRef(0);
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    
    const handleMove = (e) => {
      const now = Date.now();
      if (now - lastMouseMove.current < 16) return; // 60fps limit
      lastMouseMove.current = now;
      
      setCursorTrail((prev) => [
        ...prev.slice(-15), // Reduced trail length
        { x: e.clientX, y: e.clientY, id: Math.random(), time: now }
      ]);
    };
    
    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isMobile, prefersReducedMotion]);

  // Performance-adaptive particle system
  const particleCount = useMemo(() => {
    if (prefersReducedMotion) return 0;
    if (isLowEnd) return 15;
    if (isMobile) return 25;
    return 40;
  }, [isMobile, isLowEnd, prefersReducedMotion]);

  useEffect(() => {
    if (!isInView) return;
    
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 4
    }));
    
    setVisibleParticles(particles);
  }, [particleCount, isInView]);

  // Optimized floating shapes data
  const floatingShapes = useMemo(() => [
    {
      id: "circle",
      className: "w-20 h-20 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-pink-500",
      shadowClass: "shadow-[0_0_40px_rgba(255,0,80,0.6)] md:shadow-[0_0_80px_rgba(255,0,80,0.8)]",
      position: { left: "8%", top: "15%" },
      animation: { 
        y: isMobile ? [0, -15, 0] : [0, -30, 0], 
        rotate: [0, 8, -8, 0] 
      },
      duration: isMobile ? 6 : 8
    },
    {
      id: "triangle",
      className: "w-0 h-0 border-l-[30px] border-r-[30px] border-b-[50px] md:border-l-[60px] md:border-r-[60px] md:border-b-[100px] border-l-transparent border-r-transparent border-b-pink-500",
      shadowClass: "drop-shadow-[0_0_40px_rgba(255,0,80,0.6)] md:drop-shadow-[0_0_80px_rgba(255,0,80,0.8)]",
      position: { right: "10%", bottom: "20%" },
      animation: { 
        y: isMobile ? [0, 15, 0] : [0, 30, 0], 
        rotate: [0, -10, 10, 0] 
      },
      duration: isMobile ? 7 : 9
    },
    {
      id: "square",
      className: "w-16 h-16 md:w-28 md:h-28 border-2 md:border-4 border-pink-500 rotate-45",
      shadowClass: "shadow-[0_0_40px_rgba(255,0,80,0.6)] md:shadow-[0_0_80px_rgba(255,0,80,0.8)]",
      position: { left: "50%", bottom: "12%" },
      animation: { 
        y: isMobile ? [0, -12, 0] : [0, -25, 0], 
        rotate: [45, 60, 30, 45] 
      },
      duration: isMobile ? 8 : 10
    }
  ], [isMobile]);

  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = {
    scale: isMobile ? 1.05 : 1.12,
    rotate: isMobile ? 1 : 2,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  };

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative min-h-screen px-4 md:px-6 py-20 md:py-32 overflow-hidden"
    >
      {/* Layer 1: Enhanced base gradient with subtle animation */}
      <motion.div
        className="fixed inset-0 -z-50"
        style={{
          background: "radial-gradient(ellipse at center, rgba(15,0,20,0.95), rgba(5,0,10,0.98), black)"
        }}
        animate={!prefersReducedMotion ? {
          background: [
            "radial-gradient(ellipse at 40% 40%, rgba(15,0,20,0.95), rgba(5,0,10,0.98), black)",
            "radial-gradient(ellipse at 60% 60%, rgba(20,0,15,0.95), rgba(8,0,12,0.98), black)",
            "radial-gradient(ellipse at 40% 40%, rgba(15,0,20,0.95), rgba(5,0,10,0.98), black)"
          ]
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 2: Optimized moving grid */}
      {!prefersReducedMotion && (
        <motion.div
          className="fixed inset-0 -z-40 opacity-5 md:opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,0,80,0.4) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,0,80,0.4) 1px, transparent 1px)`,
            backgroundSize: `${isMobile ? '60px 60px' : '80px 80px'}`
          }}
          animate={{ 
            backgroundPosition: [
              "0px 0px", 
              `${isMobile ? '60px 60px' : '80px 80px'}`
            ] 
          }}
          transition={{ 
            duration: isMobile ? 20 : 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      )}

      {/* Layer 3: Performance-optimized dust particles */}
      {visibleParticles.map((particle) => (
        <motion.div
          key={`dust-${particle.id}`}
          className="fixed w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white pointer-events-none"
          style={{
            top: `${particle.y}%`,
            left: `${particle.x}%`,
            opacity: particle.opacity,
            willChange: 'transform, opacity'
          }}
          animate={!prefersReducedMotion ? {
            y: isMobile ? [0, -25, 0] : [0, -50, 0],
            opacity: [particle.opacity * 0.3, particle.opacity * 0.8, particle.opacity * 0.3],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay
          }}
        />
      ))}

      {/* Layer 4: Enhanced light sweeps */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="fixed inset-0 -z-30 opacity-60 md:opacity-100"
            style={{
              background: "linear-gradient(75deg, transparent, rgba(255,0,80,0.06), transparent)"
            }}
            animate={{ 
              backgroundPosition: ["-200% 0%", "200% 0%"] 
            }}
            transition={{ 
              duration: isMobile ? 8 : 12, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          
          {/* Additional sweep for depth */}
          <motion.div
            className="fixed inset-0 -z-29 opacity-40"
            style={{
              background: "linear-gradient(-45deg, transparent, rgba(0,255,135,0.04), transparent)"
            }}
            animate={{ 
              backgroundPosition: ["200% 0%", "-200% 0%"] 
            }}
            transition={{ 
              duration: isMobile ? 10 : 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: 3
            }}
          />
        </>
      )}

      {/* Layer 5: Optimized floating Squid Game shapes */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className={`fixed ${shape.className} ${shape.shadowClass} bg-black/30 backdrop-blur-sm`}
          style={{ 
            ...shape.position,
            willChange: 'transform'
          }}
          animate={!prefersReducedMotion ? shape.animation : {}}
          transition={{ 
            duration: shape.duration, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      ))}

      {/* Enhanced cursor trail for desktop */}
      {!isMobile && cursorTrail.map((point) => (
        <motion.div
          key={point.id}
          className="fixed w-3 h-3 md:w-4 md:h-4 rounded-full pointer-events-none z-50"
          style={{
            background: "radial-gradient(circle, rgba(255,0,80,0.8), rgba(255,0,80,0.3), transparent)",
            willChange: 'transform, opacity'
          }}
          initial={{ 
            x: point.x - (isMobile ? 6 : 8), 
            y: point.y - (isMobile ? 6 : 8), 
            scale: 1, 
            opacity: 0.8 
          }}
          animate={{ 
            scale: [1, 0.3], 
            opacity: [0.8, 0] 
          }}
          transition={{ duration: 0.5 }}
        />
      ))}

      {/* Section Title with enhanced effects */}
      <motion.div
        className="mb-16 md:mb-24 text-center relative z-20"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-wide mb-6 text-stromBlue relative"
          whileInView={!prefersReducedMotion ? {
            textShadow: [
              "0 0 20px rgba(59, 130, 246, 0.5)",
              "0 0 40px rgba(59, 130, 246, 0.8)",
              "0 0 20px rgba(59, 130, 246, 0.5)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          OUR <span className="text-stromAccent">EVENTS</span>
        </motion.h2>

        {/* Enhanced shapes beside title */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mt-4">
          {[
            { 
              className: "w-6 h-6 md:w-10 md:h-10 rounded-full border-2 md:border-4 border-pink-500",
              shadow: "shadow-[0_0_15px_rgba(255,0,80,0.8)] md:shadow-[0_0_20px_rgba(255,0,80,0.8)]",
              animation: { y: [0, -4, 0] },
              duration: 2
            },
            {
              className: "w-0 h-0 border-l-[8px] border-r-[8px] border-b-[14px] md:border-l-[14px] md:border-r-[14px] md:border-b-[24px] border-l-transparent border-r-transparent border-b-pink-500",
              shadow: "drop-shadow-[0_0_15px_rgba(255,0,80,0.8)] md:drop-shadow-[0_0_20px_rgba(255,0,80,0.8)]",
              animation: { y: [0, 4, 0] },
              duration: 2.2
            },
            {
              className: "w-6 h-6 md:w-10 md:h-10 border-2 md:border-4 border-pink-500 rotate-45",
              shadow: "shadow-[0_0_15px_rgba(255,0,80,0.8)] md:shadow-[0_0_20px_rgba(255,0,80,0.8)]",
              animation: { y: [0, -4, 0] },
              duration: 2.4
            }
          ].map((shape, i) => (
            <motion.div
              key={i}
              className={`${shape.className} ${shape.shadow}`}
              animate={!prefersReducedMotion ? shape.animation : {}}
              transition={{ 
                duration: shape.duration, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Event Cards with better mobile layout */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {events.map((ev, index) => (
          <motion.div
            key={ev.id}
            variants={cardVariants}
            whileHover={!isMobile ? hoverVariants : undefined}
            whileTap={isMobile ? { scale: 0.98 } : undefined}
            className={`transform transition-all duration-300 rounded-2xl border border-pink-500/30 md:border-2 md:border-pink-500/50 
                       backdrop-blur-sm bg-black/30 md:bg-black/40 overflow-hidden
                       hover:border-pink-500/80 hover:shadow-[0_0_30px_rgba(255,0,80,0.6)] 
                       md:hover:shadow-[0_0_50px_rgba(255,0,80,0.8)]`}
            style={{ willChange: 'transform' }}
          >
            <EventCard ev={ev} />
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile-specific floating action elements */}
      {isMobile && !prefersReducedMotion && (
        <div className="fixed bottom-20 right-4 z-30">
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-pink-500/50 bg-black/40 backdrop-blur-sm"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 10px rgba(255,0,80,0.3)",
                "0 0 20px rgba(255,0,80,0.6)",
                "0 0 10px rgba(255,0,80,0.3)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}
    </section>
  );
}