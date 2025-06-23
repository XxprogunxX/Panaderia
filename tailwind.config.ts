import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Georgia: ['Georgia', 'serif'],
        Montserrat: ['Montserrat', 'sans-serif'],
        Playfair_Display: ['"Playfair Display"', 'serif'],
        Open_Sans: ['"Open Sans"', 'sans-serif'],
      },
      colors: {
        'primary-brown': '#4b3a2f',
        'light-cream': '#f9f5f1',
        'accent-warm': '#a1887f',
        'hero-bg': '#fceee3',
      },
    },
  },
  plugins: [
    require('tailwindcss-filters'), // 👈 necesario para backdropFilter y blur
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
