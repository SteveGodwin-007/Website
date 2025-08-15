import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaUsers, FaPhone } from "react-icons/fa";

export default function EventCard({ ev }) {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-lg border border-pink-500/20 rounded-2xl p-6 flex flex-col items-center text-center hover:border-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.6)] transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {/* Logo */}
      {ev.logo && (
        <img
          src={ev.logo}
          alt={`${ev.title} Logo`}
          className="w-24 h-24 object-contain mb-4 drop-shadow-[0_0_10px_rgba(236,72,153,0.7)]"
        />
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold text-pink-400 drop-shadow-lg">
        {ev.title}
      </h3>

      {/* Event name (optional) */}
      {ev.event && (
        <p className="text-sm text-gray-400 italic mt-1">{ev.event}</p>
      )}

      {/* Description */}
      <p className="text-gray-300 text-sm mt-3 leading-relaxed">
        {ev.description}
      </p>

      {/* Details with icons */}
      <div className="mt-4 text-gray-300 text-sm space-y-2 w-full">
        <p className="flex items-center justify-center gap-2">
          <FaUsers className="text-pink-400" /> <span>{ev.type}</span>
        </p>
        <p className="flex items-center justify-center gap-2">
          <FaMapMarkerAlt className="text-pink-400" /> <span>{ev.venue}</span>
        </p>
        <p className="flex items-center justify-center gap-2">
          <FaClock className="text-pink-400" /> <span>{ev.timing}</span>
        </p>
      </div>

      {/* Coordinators */}
      {ev.coordinators && ev.coordinators.length > 0 && (
        <div className="mt-4 text-gray-300 text-sm w-full">
          <span className="font-semibold text-white block">Coordinators:</span>
          <ul className="mt-1 space-y-1">
            {ev.coordinators.map((c, idx) => (
              <li key={idx} className="flex items-center gap-2 justify-center">
                <FaPhone className="text-pink-400" />
                <span>{c.name}</span> —
                <a
                  href={`tel:${c.mob}`}
                  className="text-pink-400 hover:underline"
                >
                  {c.mob}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Button */}
      {ev.online ? (
        ev.form ? (
          <a
            href={ev.form}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-all duration-300"
          >
            Register Online
          </a>
        ) : (
          <span className="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded-full opacity-80">
            No Form Available
          </span>
        )
      ) : (
        <span className="mt-6 px-6 py-2 bg-gray-700 text-white font-bold rounded-full opacity-60 cursor-not-allowed">
          Register Offline
        </span>
      )}
    </motion.div>
  );
}
