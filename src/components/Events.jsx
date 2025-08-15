// src/components/Events.jsx
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import EventCard from "./EventCard";
import { events } from "../data/events";

export default function Events() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 300]);

  const [cursorTrail, setCursorTrail] = useState([]);
  useEffect(() => {
    const handleMove = (e) => {
      setCursorTrail((prev) => [
        ...prev.slice(-25),
        { x: e.clientX, y: e.clientY, id: Math.random() }
      ]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="events"
      className="relative min-h-screen px-6 py-32 overflow-hidden"
    >
      {/* Layer 1: Base gradient arena */}
      <motion.div
        className="fixed inset-0 -z-50"
        style={{
          background: "radial-gradient(circle at center, rgba(10,0,15,1), black)"
        }}
        animate={{ scale: [1, 1.05, 1], rotate: [0, 0.3, -0.3, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 2: Faint moving grid */}
      <motion.div
        className="fixed inset-0 -z-40 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,0,80,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,80,0.3) 1px, transparent 1px)",
          backgroundSize: "80px 80px"
        }}
        animate={{ backgroundPosition: ["0px 0px", "80px 80px"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 3: Dust particles */}
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="fixed w-1 h-1 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.4, 1]
          }}
          transition={{
            duration: 6 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Layer 4: Light sweeps */}
      <motion.div
        className="fixed inset-0 -z-30"
        style={{
          background:
            "linear-gradient(75deg, transparent, rgba(255,0,80,0.08), transparent)"
        }}
        animate={{ backgroundPosition: ["-200% 0%", "200% 0%"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 5: Floating Squid Game shapes with shadows */}
      {[
        {
          shape: "circle",
          size: "w-32 h-32 rounded-full border-4 border-pink-500 shadow-[0_0_80px_rgba(255,0,80,0.8)]",
          pos: { left: "10%", top: "20%" },
          anim: { y: [0, -30, 0], rotate: [0, 15, -15, 0] },
          dur: 8
        },
        {
          shape: "triangle",
          size: "w-0 h-0 border-l-[60px] border-r-[60px] border-b-[100px] border-l-transparent border-r-transparent border-b-pink-500 drop-shadow-[0_0_80px_rgba(255,0,80,0.8)]",
          pos: { right: "12%", bottom: "18%" },
          anim: { y: [0, 30, 0], rotate: [0, -20, 20, 0] },
          dur: 9
        },
        {
          shape: "square",
          size: "w-28 h-28 border-4 border-pink-500 rotate-45 shadow-[0_0_80px_rgba(255,0,80,0.8)]",
          pos: { left: "50%", bottom: "10%" },
          anim: { y: [0, -25, 0], rotate: [45, 70, 20, 45] },
          dur: 10
        }
      ].map((s, i) => (
        <motion.div
          key={i}
          className={`fixed ${s.size} bg-black/40`}
          style={s.pos}
          animate={s.anim}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Cursor trail */}
      {cursorTrail.map((p) => (
        <motion.div
          key={p.id}
          className="fixed w-4 h-4 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(255,0,80,0.7), transparent)"
          }}
          animate={{ x: p.x - 8, y: p.y - 8, opacity: [1, 0], scale: [1, 0.3] }}
          transition={{ duration: 0.6 }}
        />
      ))}

      {/* Section Title - Matches About Us style */}
      <motion.div
        className="mb-24 text-center"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-6 text-stromBlue">
          OUR <span className="text-stromAccent">EVENTS</span>
        </h2>

        {/* Shapes beside title */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <motion.div
            className="w-10 h-10 rounded-full border-4 border-pink-500 shadow-[0_0_20px_rgba(255,0,80,0.8)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-0 h-0 border-l-[14px] border-r-[14px] border-b-[24px] border-l-transparent border-r-transparent border-b-pink-500 drop-shadow-[0_0_20px_rgba(255,0,80,0.8)]"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="w-10 h-10 border-4 border-pink-500 rotate-45 shadow-[0_0_20px_rgba(255,0,80,0.8)]"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto relative z-10">
        {events.map((ev, index) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{
              scale: 1.15,
              rotate: 3,
              boxShadow:
                "0 0 70px rgba(255,0,80,1), 0 0 120px rgba(255,0,80,0.8)"
            }}
            className="transform transition-transform hover:shadow-[0_0_70px_rgba(255,0,80,1)] rounded-2xl border-2 border-pink-500/50 backdrop-blur-sm bg-black/40"
          >
            <EventCard ev={ev} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
