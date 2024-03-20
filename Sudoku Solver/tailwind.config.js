/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#e6e6e6",
        background: "#1a1a1a",
        primary: "#53cbe9",
        secondary: "#0e59af",
        accent: "#4076e2",
      },
    },
  },
  plugins: [],
};
