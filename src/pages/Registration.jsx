// src/pages/Registration.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Registration() {
  return (
    <div className="min-h-screen bg-black/90 text-white py-20 px-6 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl bg-black/50 border border-pink-600 rounded-2xl shadow-lg overflow-hidden"
      >
        <h1 className="text-4xl font-bold text-center text-[#FF0050] py-6">Join the Games</h1>
        <iframe
          src="YOUR_GOOGLE_FORM_LINK_HERE"
          width="100%"
          height="700"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="bg-white"
          title="Strom 2k25 Registration"
        >
          Loading…
        </iframe>
      </motion.div>
    </div>
  );
}
