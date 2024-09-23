/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#3b49df",
        lightpurple: "#5063ff",
        darkpurple: "#2f3ab2",
        ghostpurple: "rgba(59, 73, 223, 0.1)", 
      },
    },
  },
  plugins: [],
};
