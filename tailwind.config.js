const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./pages/**/*.{html,js}"],
  theme: {
    darkMode: 'selector',
    extend: {
      colors: {
        'md': {
          'tonal': {
            'primary': {
            '0': '#000000',
            '10': '#002111',
            '20': '#003921',
            '25': '#00452a',
            '30': '#005232',
            '35': '#005f3b',
            '40': '#006d44',
            '50': '#138858',
            '60': '#3aa370',
            '70': '#58be89',
            '80': '#74daa3',
            '90': '#91f7be',
            '95': '#c0ffd7',
            '98': '#e9ffee',
            '99': '#f5fff5',
            '100': '#ffffff',
          },
          'secondary': {
            '0': '#000000',
            '10': '#0b1f14',
            '20': '#203529',
            '25': '#2b4033',
            '30': '#374b3e',
            '35': '#42574a',
            '40': '#4e6355',
            '50': '#667c6d',
            '60': '#7f9686',
            '70': '#9ab1a0',
            '80': '#b5ccbb',
            '90': '#d0e8d6',
            '95': '#dff7e4',
            '98': '#e9ffee',
            '99': '#f5fff5',
            '100': '#ffffff',
          },
          'tertiary': {
            '0': '#000000',
            '10': '#001f27',
            '20': '#043542',
            '25': '#15414d',
            '30': '#224c59',
            '35': '#2f5865',
            '40': '#3c6471',
            '50': '#557d8b',
            '60': '#6e97a5',
            '70': '#89b1c0',
            '80': '#a4cddc',
            '90': '#bfe9f9',
            '95': '#dcf5ff',
            '98': '#f2fbff',
            '99': '#f9fdff',
            '100': '#ffffff',
          },
          'neutral': {
            '0': '#000000',
            '10': '#191c1a',
            '20': '#2e312e',
            '25': '#393c39',
            '30': '#444744',
            '35': '#505350',
            '40': '#5c5f5c',
            '50': '#757874',
            '60': '#8f918e',
            '70': '#a9aca8',
            '80': '#c5c7c3',
            '90': '#e1e3df',
            '95': '#eff1ed',
            '98': '#f8faf5',
            '99': '#fbfdf8',
            '100': '#ffffff',
          },
          'neutral-variant': {
            '0': '#000000',
            '10': '#151d18',
            '20': '#2a322d',
            '25': '#353d37',
            '30': '#404942',
            '35': '#4c544e',
            '40': '#58605a',
            '50': '#707972',
            '60': '#8a938b',
            '70': '#a5ada5',
            '80': '#c0c9c0',
            '90': '#dce5dc',
            '95': '#eaf3ea',
            '98': '#f3fcf3',
            '99': '#f6fff5',
            '100': '#ffffff',
          },
          'error': {
            '0': '#000000',
            '10': '#410002',
            '20': '#690005',
            '25': '#7e0007',
            '30': '#93000a',
            '35': '#a80710',
            '40': '#ba1a1a',
            '50': '#de3730',
            '60': '#ff5449',
            '70': '#ff897d',
            '80': '#ffb4ab',
            '90': '#ffdad6',
            '95': '#ffedea',
            '98': '#fff8f7',
            '99': '#fffbff',
            '100': '#ffffff',
          }
          },
          'light': {

          },
          'dark': {
            'surface-container': '#1b211d'
          }
        }
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    prefix: 'dy-',
    themes: [
      { light: {
          "primary": "#006d44",
          "secondary": "#4e6355",
          "accent": "#3c6471",
          "neutral": "#707972",
          "base-100": "#fbfdf8",
          "info": "#006c52",
          "success": "#006e2e",
          "warning": "#7c5800",
          "error": "#ba1a1a",
      } },
      { dark: {
          "primary": "#74daa3",
          "secondary": "#b5ccbb",
          "accent": "#a4cddc",
          "neutral": "#8a938b",
          "base-100": "#191c1a",
          "info": "#64dbb3",
          "success": "#79db89",
          "warning": "#f7bd48",
          "error": "#ffb4ab",
      }, }, 
    ]
  },
  prefix: 'tw-',
}

