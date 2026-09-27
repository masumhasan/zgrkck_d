/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#244E41',
          dark: '#1a3c31',
          hover: '#1e4337',
          light: '#F1F5F3',
          sidebar: '#EFEFEA',
          sidebarActive: '#DFDFD9',
          sidebarHover: '#E6E6E0',
          mainBg: '#FAF8F5',
          card: '#FFFFFF',
          border: '#E2DFD7',
          borderSubtle: '#ECE8DF',
          accent: '#A66C2F',
        }
      }
    },
  },
  plugins: [],
}
