/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Define tus colores personalizados aquí
        'primary': '#76ABAE', // Color principal
        'primary-2': '#5d8a8d', // Color principal
        'secondary': '#EEEEEE', // Color secundario
        'background': '#222831', // Color de fondo
        'background-2': '#31363F' // Otro color adicional
      }
    }
  },
  plugins: []
}
