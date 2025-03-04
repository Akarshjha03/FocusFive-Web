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
        'neon-blue': 'rgb(30, 144, 255)',
        'neon-green': 'rgb(0, 255, 127)',
        'dark-bg': '#1a1a1a',
        'dark-card': '#2a2a2a',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(30, 144, 255, 0.5), 0 0 10px rgba(30, 144, 255, 0.3)',
        'neon-green': '0 0 5px rgba(0, 255, 127, 0.5), 0 0 10px rgba(0, 255, 127, 0.3)',
      },
      animation: {
        'neon-pulse': 'neonPulse 3s infinite',
      },
      keyframes: {
        neonPulse: {
          '0%': { left: '-100%' },
          '50%': { left: '100%' },
          '100%': { left: '100%' },
        },
      },
    },
  },
  plugins: [],
};
export default config;