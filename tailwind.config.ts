import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#183C2B',
          light: '#23533c',
          dark: '#0f271c',
        },
        garden: {
          DEFAULT: '#356B45',
          light: '#438456',
          dark: '#275234',
        },
        olive: {
          DEFAULT: '#70855A',
          light: '#829a6b',
          dark: '#586946',
        },
        sage: {
          DEFAULT: '#A8B69A',
          light: '#bcc7b1',
          dark: '#8e9d7f',
        },
        earth: {
          DEFAULT: '#795C3A',
          light: '#916f46',
          dark: '#5e472c',
        },
        cream: {
          DEFAULT: '#F4F0E6',
          light: '#fbf9f4',
          dark: '#e8e2d2',
        },
        softwhite: {
          DEFAULT: '#FBFAF6',
          pure: '#FFFFFF',
        },
        charcoal: {
          DEFAULT: '#20251F',
          light: '#353c34',
          muted: '#5a6258',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
