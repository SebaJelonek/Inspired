/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      spacing: {
        "1/10":"10.5%",
        "2/10": "20%",
        "3/25": "14%",
        "8/10": "81%",
        "9/10":"90.5%",
    },
  },
  },
  plugins: [],
}