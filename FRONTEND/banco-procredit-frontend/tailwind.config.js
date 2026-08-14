/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#002753',
        'primary-container': '#003d7a',
        'primary-fixed': '#d6e3ff',
        secondary: '#b71032',
        'secondary-button': '#c41e3a',
        surface: '#f7f9ff',
        'surface-low': '#edf4ff',
        'surface-container': '#e3efff',
        'surface-high': '#d9eaff',
        outline: '#737781',
        'outline-variant': '#c3c6d2',
        'on-surface': '#091d2e',
        'on-surface-variant': '#434750',
      },
      fontFamily: {
        work: ['Work Sans', 'sans-serif'],
        plex: ['IBM Plex Sans', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(44, 62, 80, 0.06)',
      },
    },
  },
  plugins: [],
};
