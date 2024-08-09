/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-10': '#4a636f',
        'brand-30': '#303e46',
        'brand-50': '#222c31',
        'brand-70': '#151F24',
      },
    },
  },
  plugins: [],
}
