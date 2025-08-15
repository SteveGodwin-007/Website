// src/components/About.jsx
import React from "react";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 md:px-16 bg-gradient-to-b from-black via-[#0c0d0e] to-black"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-6 text-stromBlue">
          About <span className="text-stromAccent">STROM 2K25</span>
        </h2>

        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
          STROM 2K25 is the flagship technical symposium of Loyola-ICAM College
          of Engineering and Technology — a stage for the boldest minds to
          innovate, compete, and collaborate.
        </p>

        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
          From high-energy hackathons to mind-bending challenges, STROM brings
          together the brightest talents to celebrate engineering, creativity,
          and teamwork. Prepare yourself for an unforgettable experience!
        </p>
      </div>
    </section>
  );
}
