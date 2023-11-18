/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('../../client/src/images/hero9.jpg')"
      },
    },
  },
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
}
