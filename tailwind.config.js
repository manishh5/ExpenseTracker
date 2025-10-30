/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366F1",
        success: "#16A34A",
        danger: "#DC2626",
        card: "#ffffff",
        bg: "#f4f6f9",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.04)"
      }
    }
  },
  plugins: [],
};
