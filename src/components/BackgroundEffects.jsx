// src/components/BackgroundEffects.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function BackgroundEffects() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#000000" }, // dark theme
        fpsLimit: 60,
        particles: {
          number: { value: 55, density: { enable: true, area: 800 } },
          color: { value: ["#ff4b8b", "#00ff9d", "#ff0000"] }, // pink, green, red
          shape: {
            type: ["circle", "square", "triangle"], // Squid Game shapes
          },
          opacity: {
            value: 0.85,
            anim: { enable: true, speed: 1.5, opacity_min: 0.3 }
          },
          size: {
            value: { min: 4, max: 12 },
            anim: { enable: true, speed: 1.5, size_min: 3 }
          },
          move: {
            enable: true,
            speed: 1.8,
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          rotate: {
            random: true,
            direction: "clockwise",
            animation: { enable: true, speed: 4 }
          },
          shadow: {
            enable: true,
            color: "#ff4b8b",
            blur: 5
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" }
          },
          modes: {
            repulse: { distance: 120, duration: 0.4 },
            push: { quantity: 3 }
          }
        },
        detectRetina: true
      }}
    />
  );
}
