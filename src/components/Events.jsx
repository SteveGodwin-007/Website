import React from "react";
import { motion } from "framer-motion";
import EventCard from "./EventCard";
import { events } from "../data/events";

export default function Events() {
  return (
    <section
      id="events"
      className="min-h-screen px-6 py-20 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Heading with glow effect */}
      <motion.h2
        className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 drop-shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        Our Events
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {events.map((ev, index) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
          >
            <EventCard ev={ev} />
          </motion.div>
        ))}
      </div>

      {/* Bottom glow decoration */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-pink-500/20 to-transparent blur-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </section>
  );
}
