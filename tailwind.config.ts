import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './tests/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
        surface: 'var(--surface)',
      },
      borderRadius: {
        shell: '1.5rem',
      },
      boxShadow: {
        shell: '0 24px 60px rgba(15, 23, 42, 0.16)',
      },
    },
  },
  plugins: [],
};

export default config;
