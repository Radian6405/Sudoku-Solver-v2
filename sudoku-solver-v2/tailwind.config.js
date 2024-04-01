/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#e6e6e6",
        background: "#1a1c1c",
        darkbg: "171717",
        primary: "#0fa1c6",
        secondary: "#0e59af",
        accent: "#4076e2",
      },
    },
    fontFamily: {
      inria: ["Inria Sans", "sans-serif"],
    },
    boxShadow: {
      btnshadow: "0 0 10px 2px rgba(14, 89, 175, 0.5)",
    },
  },
  plugins: [],
};
