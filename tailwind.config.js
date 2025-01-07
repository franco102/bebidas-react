/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.svg',
  ],
  darkMode: false, // or 'class' for class-based dark mode support'
  theme: {
    extend: {
      backgroundImage:{
        "header":"url('bg.jpg')"
      }
    },
  },
  plugins: [],
}

