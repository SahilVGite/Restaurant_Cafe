/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        espresso: { DEFAULT: '#30231F', 900: '#221815', 800: '#30231F', 700: '#3D2E29' },
        terracotta: { DEFAULT: '#B96848', dark: '#9E5539', light: '#D08A6E' },
        gold: { DEFAULT: '#C5A36A', light: '#DCC497' },
        cream: { DEFAULT: '#F8F5EF', deep: '#F1EBE1' },
        charcoal: '#292421',
        muted: '#81766F',
        line: '#E9E1D8',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.22em' },
      maxWidth: { site: '84rem' },
      screens: { xs: '430px', '3xl': '1800px' },
    },
  },
  plugins: [],
}
