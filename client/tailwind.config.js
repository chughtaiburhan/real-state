module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',   // Ensures Tailwind scans all files in src directory
    './public/index.html',          // Add other relevant paths like index.html
    './components/**/*.{js,jsx,ts,tsx}' // Components folder (if you use this)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
