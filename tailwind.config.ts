import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1F7A4D',
          secondary: '#E8A935',
          light: '#E8F5E9',
          dark: '#0D3B28',
          accent: '#FF6B35',
        },
        sage: {
          50: '#f6f8f6',
          100: '#e8f0ea',
          200: '#d1e1d5',
          300: '#b5cfc0',
          400: '#8db4a3',
          500: '#6a9b87',
          600: '#52826d',
          700: '#416759',
          800: '#375648',
          900: '#2d443a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        hover: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};

export default config;
