const { default: daisyui } = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./views/**/*.ejs" ],
  theme: {
    darkMode: 'selector',
    fontFamily: {
      'sans': 'Roboto Flex',
      'serif': 'Noto Serif'
    },
    colors: {
      'text': {
        50: '#f6f6ee',
        100: '#ededde',
        200: '#dcdcbc',
        300: '#caca9b',
        400: '#b9b979',
        500: '#a7a758',
        600: '#868646',
        700: '#646435',
        800: '#434323',
        900: '#212112',
        950: '#111109',
      },
      'background': {
        50: '#f6f6ee',
        100: '#eeecdd',
        200: '#dcdabc',
        300: '#cbc79a',
        400: '#bab478',
        500: '#a8a257',
        600: '#878145',
        700: '#656134',
        800: '#434123',
        900: '#222011',
        950: '#111009',
      },
    },
    extend: {
      screens: {
        'sm-500': '500px',
        'sm-700': '700px',
        'md-840': '840px',
        'md-860': '860px',
        'xl-970': '970px'
      },
    }
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    prefix: 'dy-',
    themes: [
      { light: {
        "primary": "#b4a64b",
        "secondary": "#b6d5a5",
        "accent": "#58904c",
        "neutral": "#32301a",
        "base-100": "#f1f0e4",
        "info": "#006687",
        "success": "#1c6d0a",
        "warning": "#785a00",
        "error": "#b52700",
      } },
      { dark: {
        "primary": "#b4a64b",
        "secondary": "#3b5a2a",
        "accent": "#7cb36f",
        "neutral": "#32301a",
        "base-100": "#1b1a0e",
        "info": "#71d2ff",
        "success": "#87db6e",
        "warning": "#f8be1f",
        "error": "#ffb4a2",
      }, }, 
    ]
  },
  prefix: 'tw:',
}

