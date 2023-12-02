module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}',"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },

    extend: {
      screens: {
        '2k': '2560px',
      },
      colors: {
        primary: "#FFAF1D",
        secondary:'#667085',

        lightGray:'#344054'
      },
      lineHeight: {
        hero: '4.5rem',
      },
      fontFamily: {
        rem: ['REM', 'sans-serif'],
      },
      backgroundColor: {
        'blue-opacity-50': 'rgba(21, 14, 57, 0.50)',
        dark:"#00000080",
        darkBlue: "#150E3980"
      },
    },
  },
  plugins: [],
//   content: [
//     "./node_modules/tailwind-datepicker-react/dist/**/*.js",
// ],

};
