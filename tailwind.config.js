/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#EEF0E8',
        paperDim: '#E4E7DC',
        ink: '#172019',
        inkSoft: '#3B453D',
        rust: '#BE5B2E',
        rustDark: '#9A491F',
        moss: '#4B6455',
        sand: '#D9C79E',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Source Serif 4"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(23,32,25,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23,32,25,0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '28px 28px',
      },
    },
  },
  plugins: [],
}
