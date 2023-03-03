/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#2C8EFF',
          400: '#1B8BCE',
          300: '#E1EFFF',
        },
        orange: {
          900: '#ED4C5C',
          500: '#EB7421',
        },
        green: {
          600: '#47CA5B',
          500: '#48CA5C',
          350: '#DAFFDF',
          300: '#B6F6C0'
        },
        gray: {
          900: '#313131',
          800: '#616161',
          700: '#7C7C7C',
          650: '#C7C7C7',
          600: '#888888',
          550: '#DCDCDC',
          500: '#B8B8B8',
          450: '#B6B6B6',
          425: '#F8F8F8',
          400: '#B5B5B5',
          350: '#EBEBEB',
          300: '#B4B4B4',
        }
      }
    },
  },
  plugins: [],
}
