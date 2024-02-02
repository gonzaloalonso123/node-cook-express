/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "nc-light-green": "#DCFFB7",
        "nc-green" : "#00C9A5",
        "nc-red": "#FF6868",
        "nc-orange": "#FFBB64",
        "nc-yellow": "#FFEAA7",
        "nc-dark-orange": "#FFA500",
        "nc-dark-green": "#00B894",
        "nc-blue" : "#350b99"
      },
      dropShadow: {
        "nc-dark-orange": "0 0 10px #FFA500",
      },
    },
  },
  plugins: [],
};
