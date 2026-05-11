import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        redops: {
          red: '#C44536',
          ink: '#1A1A1A',
          paper: '#F5F1EB',
          panel: '#FDFAF6',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
        display: ['var(--font-barlow-condensed)', 'sans-serif'],
        body: ['var(--font-barlow)', 'sans-serif'],
      },
    },
  },
} satisfies Config;
