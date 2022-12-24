/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "handwriting-caveat": ['"Caveat"', "cursive"],
        "handwriting-pacifico": ['"Pacifico"', "cursive"],
        "specimen-oswald-wght-300": ['"Oswald"', "sans-serif"],
        "noto-serif-np-hmong": ['"Noto Serif NP Hmong"', "serif"],
        "tangerine": ["'Tangerine'", "cursive"]
      },
      colors: {
        "portalBg": '#390660',
      },
    },
  },
  plugins: [require("daisyui")],
};
