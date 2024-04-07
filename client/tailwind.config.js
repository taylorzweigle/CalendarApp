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
      width: {
        192: "48rem",
        256: "64rem",
      },
      height: {
        192: "48rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
