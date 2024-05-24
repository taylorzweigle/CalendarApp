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
        162: "40.5rem",
        192: "48rem",
      },
      animation: {
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
