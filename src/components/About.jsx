// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #000000, #0c0d0e 40%, #000000 100%)",
      }}
    >
      {/* Subtle animated background shapes */}
      <div className="absolute inset-0 opacity-10 flex justify-center items-center pointer-events-none">
        <div className="text-stromAccent text-[12rem] font-bold tracking-widest">
          ◯ △ □
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold tracking-wide mb-4 text-stromBlue"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About{" "}
          <span className="text-stromAccent drop-shadow-[0_0_10px_#FF0050]">
            STROM 2K25
          </span>
        </motion.h2>

        {/* Animated Divider */}
        <motion.div
          className="flex justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-stromAccent text-2xl">◯</span>
          <div className="h-[2px] w-20 bg-stromAccent" />
          <span className="text-stromAccent text-2xl">△</span>
          <div className="h-[2px] w-20 bg-stromAccent" />
          <span className="text-stromAccent text-2xl">□</span>
        </motion.div>

        {/* Paragraph 1 */}
        <motion.p
          className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          STROM 2K25 is the flagship technical symposium of{" "}
          <span className="text-white font-semibold">
            Loyola-ICAM College of Engineering and Technology
          </span>{" "}
          — a stage for the boldest minds to innovate, compete, and collaborate.
        </motion.p>

        {/* Paragraph 2 */}
        <motion.p
          className="text-lg md:text-xl text-gray-400 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          From high-energy hackathons to mind-bending challenges, STROM brings
          together the brightest talents to celebrate{" "}
          <span className="text-white font-semibold">
            engineering, creativity, and teamwork
          </span>
          . Prepare yourself for an{" "}
          <span className="text-stromAccent font-bold">unforgettable game</span>{" "}
          where every moment counts.
        </motion.p>
      </div>
    </section>
  );
}
