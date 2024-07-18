/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        'mobile': {'max': '768px'},
      },
      fontFamily: {
        juanaBold: ['juana-bold', 'sans-serif'],
        juanaMedium: ['juana-medium', 'sans-serif'],
        juanaLight: ['juana-light', 'sans-serif'],
        juanaRegular: ['juana-regular', 'sans-serif'],
        juanaThin: ['juana-thin', 'sans-serif'],
        juanaSemibold: ['juana-semibold', 'sans-serif'],
      },
      color:{
        primary : `#6A4D6F`
      },
    },
  },
  plugins: [],
};
