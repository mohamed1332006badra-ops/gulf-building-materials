/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        industrial: {
          950: "#090D14",
          900: "#0F172A",
          800: "#1E293B",
          700: "#334155",
        },
        safety: {
          amber: "#F59E0B",
          dark: "#D97706",
        },
        wa: {
          DEFAULT: "#25D366",
          dark: "#1DA851",
        }
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "Cairo", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
