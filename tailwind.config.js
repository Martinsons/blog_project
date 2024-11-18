/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // You can customize these colors
        primary: '#1a365d',
        secondary: '#2d3748',
        accent: '#f56565',
        // Add more custom colors here
      },
      fontFamily: {
        // Add custom fonts here
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-playfair)', 'serif'],
      },
      spacing: {
        // Add custom spacing if needed
      },
      borderRadius: {
        // Add custom border radius if needed
      },
      boxShadow: {
        // Add custom shadows if needed
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
