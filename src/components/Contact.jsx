import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="min-h-[80vh] px-6 py-20 flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-pink-900/30 via-black/50 to-purple-900/30 -z-20"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Floating Squid Game shapes */}
      <motion.div className="absolute left-[8%] top-[25%] w-20 h-20 rounded-full border-4 border-pink-500 shadow-[0_0_40px_rgba(255,0,80,1)]" animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute right-[12%] top-[15%] w-0 h-0 border-l-[35px] border-r-[35px] border-b-[60px] border-l-transparent border-r-transparent border-b-pink-500 drop-shadow-[0_0_40px_rgba(255,0,80,1)]" animate={{ y: [0, 20, 0], rotate: [0, -10, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute left-[50%] bottom-[15%] w-20 h-20 border-4 border-pink-500 shadow-[0_0_40px_rgba(255,0,80,1)] rotate-45" animate={{ y: [0, -15, 0], rotate: [45, 60, 30, 45] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />

      {/* Contact card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl w-full backdrop-blur-2xl bg-black/60 border border-pink-500/60 shadow-[0_0_50px_rgba(255,0,80,1)] p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10"
      >
        <div>
          <h3 className="text-4xl font-extrabold mb-6 text-pink-400 drop-shadow-[0_0_10px_rgba(255,0,80,1)]">Contact & Location</h3>
          <p className="text-base text-gray-300 mb-2">Email: <a className="text-pink-400 hover:underline">strom2k25@licet.ac.in</a></p>
          <p className="text-base text-gray-300 mb-6">Phone: <a className="text-pink-400 hover:underline">+91 93611 76702 (Sanjeev Kumar)</a></p>

          <h4 className="mt-6 mb-2 font-semibold text-white text-lg">Location</h4>
          <p className="text-base text-gray-300 mb-6">Loyola ICAM College of Engineering and Technology</p>

          <a href="https://maps.app.goo.gl/MY7oxgHZFKtAu9tm8" target="_blank" rel="noreferrer" className="inline-block px-8 py-3 bg-pink-500 text-black font-bold rounded-lg shadow-[0_0_20px_rgba(255,0,80,1)] hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,80,1)] transition-transform">
            Open in Maps
          </a>
        </div>

        <div className="flex items-center justify-center">
          <iframe title="LICET Map" src="https://www.google.com/maps?q=Loyola+ICAM+College+of+Engineering+and+Technology&z=15&output=embed" className="w-full h-80 rounded-xl border-0 shadow-[0_0_25px_rgba(255,0,80,1)]" />
        </div>
      </motion.div>
    </div>
  );
}
