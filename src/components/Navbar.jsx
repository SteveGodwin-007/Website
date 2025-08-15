import React from 'react'
import { motion } from 'framer-motion'

const links = [
  { id: 'welcome', label: 'Welcome' },
  { id: 'about', label: 'About' },
  { id: 'events', label: 'Events' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl"
    >
      <div className="flex items-center justify-between p-3 card-glass rounded-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-stromBlue to-stromAccent flex items-center justify-center font-bold">S</div>
          <div>
            <div className="text-sm font-semibold">STROM 2K25</div>
            <div className="text-xs text-gray-400">Loyola-ICAM College of Engineering & Technology</div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="text-sm hover:text-stromAccent transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}