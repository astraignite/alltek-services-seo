/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0A1E3F', // Primary Dark Blue
        },
        accent: {
          DEFAULT: '#D42E34', // Accent Red
        },
        secondary: {
          DEFAULT: '#3A70B7', // Light Blue
        },
        lightgray: {
          DEFAULT: '#F5F5F7', // Light Gray
        },
        darkgray: {
          DEFAULT: '#333333', // Dark Gray
        }
      },
      fontFamily: {
        sans: ['Open Sans', 'Roboto', 'sans-serif'],
        heading: ['Montserrat', 'Open Sans', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1200px',
        },
      },
    },
  },
  plugins: [],
}
