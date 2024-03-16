const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.{html,js}',
    './pages/**/*.{html,js}',
    './resources/**/*.{html,js}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  prefix: 'tw-',
}

