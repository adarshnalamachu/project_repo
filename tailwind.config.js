/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors :{

        nav:"#0077b6",
        
        bluee: "#00b4d8",
        viol : "#eeedff",
        card:"#e7f8ee",
        mg:"#fb8500",
        
        oran: "#00b4d8",
        oran2: "#023e8a"  
        // 7191a6 346280 635bff f7c4af
      }
    },
  },
  plugins: [],
}

