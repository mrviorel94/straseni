import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': 'rgb(29 92 63 / <alpha-value>)',
        'forest-green-light': 'rgb(45 115 73 / <alpha-value>)',
        'forest-green-dark': 'rgb(20 58 40 / <alpha-value>)',
        'warm-white': 'rgb(250 249 247 / <alpha-value>)',
        'beige': 'rgb(212 181 160 / <alpha-value>)',
        'beige-light': 'rgb(232 220 212 / <alpha-value>)',
        'beige-dark': 'rgb(192 157 136 / <alpha-value>)',
        'charcoal': 'rgb(45 45 45 / <alpha-value>)',
        'text-light': 'rgb(90 90 90 / <alpha-value>)',
        'text-muted': 'rgb(122 122 122 / <alpha-value>)',
        'light-gray': 'rgb(240 237 233 / <alpha-value>)',
        'gray': 'rgb(201 196 191 / <alpha-value>)',
        'dark-gray': 'rgb(154 148 144 / <alpha-value>)',
        'accent-warm': 'rgb(193 117 69 / <alpha-value>)',
        'accent-warm-light': 'rgb(212 148 107 / <alpha-value>)',
        'success': 'rgb(45 115 73 / <alpha-value>)',
        'error': 'rgb(193 117 69 / <alpha-value>)',
        'warning': 'rgb(192 157 136 / <alpha-value>)',
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
