/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius:{
        "5px": "5px", 
      },
      colors:{
        primary_text: '#18191F',
        second_text: '#FFFFFF',
        tertiary_text: '#D1D5DB',
        primary_color: '#FCFAFA',
        secondary_color: '#004346',
        tertiary_color: '#09BC8A',
        card_color: '#508991',
        dark_green: '#172A3A',
        red: '#992020',
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}

