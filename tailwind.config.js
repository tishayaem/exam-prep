/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#fefdfb',
        accent: '#f59e0b',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'feedback-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'emphasis-pop': {
          '0%': { transform: 'scale(1)' },
          '55%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)' },
        },
        'home-button-in': {
          from: { opacity: '0', transform: 'translate(-50%, 12px)' },
          to: { opacity: '1', transform: 'translate(-50%, 0)' },
        },
      },
      animation: {
        'feedback-in':
          'feedback-in var(--motion-duration-normal) var(--ease-emphasis) both',
        'emphasis-pop':
          'emphasis-pop var(--motion-duration-normal) var(--ease-emphasis) 1',
        'home-button-in':
          'home-button-in var(--motion-duration-normal) var(--ease-emphasis) both',
      },
    },
  },
  plugins: [],
};
