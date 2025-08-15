import React from 'react'
import { motion } from 'framer-motion'

export default function HeroShimmer({ title = "STROM 2K25", subtitle }) {
  return (
    <div className="text-center">
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-squidPink drop-shadow-[0_0_15px_rgba(255,0,85,0.8)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {title}
      </motion.h1>

      <motion.p
        className="mt-4 text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {subtitle || "Gear up for the ultimate technical showdown — innovation, skill, and glory await."}
      </motion.p>

      <motion.div
        className="mt-8 flex justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <a
          href="#events"
          className="px-6 py-3 rounded-full bg-squidPink text-white font-bold shadow-lg hover:bg-pink-600 transition"
        >
          View Events
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-full border-2 border-green-500 text-green-400 font-bold hover:bg-green-500 hover:text-black transition"
        >
          Join the Game
        </a>
      </motion.div>
    </div>
  )
}
