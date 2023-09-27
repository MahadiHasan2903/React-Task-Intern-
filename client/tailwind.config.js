/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: {
        "1000px": "1050px",
        "799px": "799px",
        "800px": "800px",
      },
    },
  },
  variants: {},
  plugins: [],
};
