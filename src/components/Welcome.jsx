import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export default function Welcome() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            color: { value: ["#ff007f", "#00ff9d", "#ff0000"] },
            shape: { type: "circle" },
            opacity: { value: 0.8, random: true },
            size: { value: 3, random: true },
            move: { speed: 1, direction: "none", outModes: "out" },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-red-900/20 to-green-900/20 blur-3xl animate-pulse" />

      {/* Logos */}
      <div className="flex items-center justify-center gap-12 mb-8 z-10">
        <motion.img
          src="/logos/licet-logo.jpeg"
          alt="LICET"
          className="w-28 drop-shadow-[0_0_25px_#00ff9d]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.img
          src="/logos/strom-logo.png"
          alt="STROM"
          className="w-32 drop-shadow-[0_0_25px_#ff007f]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      {/* Title */}
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="text-pink-500 drop-shadow-[0_0_15px_#ff007f]">Welcome</span>{" "}
        <span className="text-green-400 drop-shadow-[0_0_15px_#00ff9d]">to</span>{" "}
        <span className="text-red-500 drop-shadow-[0_0_15px_#ff0000]">STROM 2K25</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-center max-w-2xl text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        Loyola-ICAM College of Engineering and Technology presents its flagship
        technical symposium — a celebration of innovation, teamwork, and technical
        excellence.
      </motion.p>

      {/* Button */}
      <motion.a
        href="/events"
        className="mt-8 px-6 py-3 text-lg font-semibold text-white rounded-lg 
                   border-2 border-pink-500 hover:border-green-400 
                   shadow-[0_0_15px_#ff007f] hover:shadow-[0_0_20px_#00ff9d] 
                   transition duration-300"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        Explore Events
      </motion.a>
    </div>
  );
}
