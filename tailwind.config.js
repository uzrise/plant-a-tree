/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        fly: {
          "0%": {
            transform: "translateX(0) translateY(0) scale(0, 0)",
            opacity: 0,
          },
          "10%": {
            transform: "translateX(0) translateY(0) scale(0, 0)",
            opacity: 0,
          },
          "20%": {
            transform: "translateX(80px) translateY(-50px) scale(-1, 1)",
            opacity: 1,
          },
          "50%": {
            transform: "translateX(80px) translateY(-50px) scale(-1, 1)",
            opacity: 1,
          },
          "55%": {
            transform: "translateX(-100px) translateY(-20px)  scale(0.7, 0.7)",
            opacity: 1,
          },
          "75%": {
            transform: "translateX(-100px) translateY(-20px)  scale(0.7, 0.7)",
            opacity: 1,
          },
          "90%": {
            transform: "translateX(0) translateY(0) scale(0, 0)",
            opacity: 0,
          },
          "100%": { transform: "translateX(0) translateY(0)", opacity: 0 },
        },
        flyStraight: {
          "0%": { transform: "translateX(0)", opacity: 1 },
          "100%": { transform: "translateX(200vw)", opacity: 1 }, // O'ng tomonga harakat
        },
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
        fly: "fly 8s linear infinite",
        flyStraight: "flyStraight 10s linear infinite", // Animatsiya davomiyligi
      },
    },
  },
  plugins: [],
};
