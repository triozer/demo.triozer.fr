/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      gridTemplateRows: {
        'layout': 'auto 1fr',
      }
    },
  },
  plugins: [],
}
