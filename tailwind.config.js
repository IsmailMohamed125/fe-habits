/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2E3239",
        "primary-dark": "#26292B",
        secondary: "#5F7ADB",
        "secondary-light": "#A2B2EE",
      },
    },
  },
  plugins: [],
};
