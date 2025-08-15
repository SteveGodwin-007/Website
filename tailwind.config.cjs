/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sgBlack: "#0B0B0B",    // deep black
        sgMuted: "#1A1A1A",    // muted dark gray
        sgBeige: "#E8DCC2",    // text beige
        sgPink: "#FF0050",     // squid game pink
        sgGreen: "#00FF87",    // squid game green
        sgRed: "#E50914",      // squid guard red
        sgWhite: "#F9F9F9",    // bright white
      },
      fontFamily: {
        sgTitle: ['"Bebas Neue"', "sans-serif"],
        sgBody: ['"Montserrat"', "sans-serif"],
      },
      boxShadow: {
        sgNeonPink: "0 0 10px #FF0050, 0 0 20px #FF0050, 0 0 40px #FF0050",
        sgNeonGreen: "0 0 10px #00FF87, 0 0 20px #00FF87, 0 0 40px #00FF87",
        sgNeonRed: "0 0 10px #E50914, 0 0 20px #E50914, 0 0 40px #E50914",
      },
      keyframes: {
        neonPulse: {
          "0%, 100%": {
            opacity: "1",
            textShadow: "0 0 10px currentColor, 0 0 20px currentColor",
          },
          "50%": {
            opacity: "0.7",
            textShadow: "0 0 5px currentColor",
          },
        },
        flicker: {
          "0%, 19.999%, 22%, 62.999%, 64%, 100%": { opacity: "1" },
          "20%, 21.999%, 63%, 63.999%": { opacity: "0" },
        },
      },
      animation: {
        neonPulse: "neonPulse 1.5s infinite ease-in-out",
        flicker: "flicker 3s infinite",
      },
    },
  },
  plugins: [],
};