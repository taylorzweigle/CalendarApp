/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern:
        /(bg|hover:bg|active:bg|border|text|icon)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ["dark", "hover", "active"],
    },
  ],
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
