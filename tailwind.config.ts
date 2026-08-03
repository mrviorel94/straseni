import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#1d5c3f',
        'forest-green-light': '#2d7349',
        'forest-green-dark': '#143a28',
        'warm-white': '#faf9f7',
        'beige': '#d4b5a0',
        'beige-light': '#e8dcd4',
        'beige-dark': '#c09d88',
        'charcoal': '#2d2d2d',
        'text-light': '#5a5a5a',
        'text-muted': '#7a7a7a',
        'light-gray': '#f0ede9',
        'gray': '#c9c4bf',
        'dark-gray': '#9a9490',
        'accent-warm': '#c17545',
        'accent-warm-light': '#d4946b',
        'success': '#2d7349',
        'error': '#c17545',
        'warning': '#c09d88',
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
