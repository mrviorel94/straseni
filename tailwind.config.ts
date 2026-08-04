import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#0074E4',
        'forest-green-light': '#3B93F0',
        'forest-green-dark': '#003DA5',
        'warm-white': '#FFFFFF',
        'beige': '#D6E4F0',
        'beige-light': '#EAF2FC',
        'beige-dark': '#B8D4F0',
        'charcoal': '#1F2430',
        'text-light': '#5B6472',
        'text-muted': '#6B7280',
        'light-gray': '#F5F7FA',
        'gray': '#CBD2D9',
        'dark-gray': '#9AA5B1',
        'accent-warm': '#E07D0E',
        'accent-warm-light': '#F0A84E',
        'success': '#2E7D32',
        'error': '#DC2626',
        'warning': '#F59E0B',
      },
      borderRadius: {
        'default': '6px',
        'lg': '8px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
