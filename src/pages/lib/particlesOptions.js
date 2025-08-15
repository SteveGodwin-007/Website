// src/lib/particlesOptions.js
const particlesOptions = {
  fullScreen: { enable: true, zIndex: 0 },
  detectRetina: true,
  fpsLimit: 60,
  particles: {
    number: { value: 50, density: { enable: true, area: 1000 } },
    color: {
      value: ["#FF0050", "#00FF87", "#E50914"], // Pink, Green, Red
    },
    shape: {
      type: ["triangle", "square", "circle"], // Squid Game symbols
    },
    opacity: {
      value: 0.9,
      random: { enable: true, minimumValue: 0.4 },
      animation: { enable: true, speed: 0.5, minimumValue: 0.3, sync: false },
    },
    size: {
      value: { min: 12, max: 22 },
      random: true,
      animation: { enable: true, speed: 2, minimumValue: 8 },
    },
    move: {
      enable: true,
      speed: { min: 0.5, max: 1.5 },
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
    links: {
      enable: false, // no connecting lines
    },
  },
  interactivity: {
    detectsOn: "canvas",
    events: {
      onHover: { enable: true, mode: "repulse" },
      onClick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      push: { quantity: 4 },
      repulse: { distance: 120 },
    },
  },
  background: {
    color: "#0B0B0B", // Deep black
  },
};

export default particlesOptions;
