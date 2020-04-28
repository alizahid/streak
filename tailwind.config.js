const theme = require('tailwindcss/defaultTheme')

module.exports = {
  plugins: [],
  theme: {
    extend: {
      colors: {
        menu: 'rgba(0, 0, 0, 0.9)'
      },
      fontFamily: {
        sans: ['Inter', ...theme.fontFamily.sans]
      }
    }
  },
  variants: {}
}
