/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        3: "3px",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
