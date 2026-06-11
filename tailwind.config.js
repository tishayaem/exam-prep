/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0A',
        inkSoft: '#6B6B6B',
        paper: '#FFFFFF',
        off: '#F5F5F2',
        rule: '#E6E6E6',
        accent: '#f59e0b',
        // Editorial palette — used as accent punctuation, not as fills.
        neon: {
          green: '#0cf35c',
          pink: '#f50aa2',
          yellow: '#fff000',
          blue: '#0185fd',
          purple: '#8a0af5',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Fraunces"', 'Georgia', 'serif'],
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
