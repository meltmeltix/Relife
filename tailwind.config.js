const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.{html,js}',
    './pages/**/*.{html,js}',
    './resources/**/*.{html,js}'
  ],
  theme: {
    darkMode: 'selector',
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    prefix: 'daisy-',
  },
  prefix: 'tw-',
}

