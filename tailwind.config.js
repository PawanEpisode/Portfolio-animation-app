/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        border: {
          '0%, 100%': { borderColor: '#06b6d4' },
          '25%': { borderColor: '#f97316' },
          '50%': { borderColor: '#4f46e5' },
          '75%': { borderColor: '#16a34a' },
        },
      },
      animation: {
        'border-pulse': 'border 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}