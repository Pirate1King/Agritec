/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        brand: {
          blue: "#2A3A91",
          orange: "#F89C3E",
          ink: "#0F172A"
        },
        surface: {
          light: "#F7F7FA",
          border: "#E4E7EE"
        }
      },
      fontFamily: {
        heading: ["var(--font-sora)", "var(--font-manrope)"],
        body: ["var(--font-inter)"]
      },
      boxShadow: {
        soft: "0 16px 40px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
