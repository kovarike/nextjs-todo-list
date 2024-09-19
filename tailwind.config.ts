import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      boxShadow:{
        shadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
      },
      backgroundImage: {
        'button': 'linear-gradient(135deg, #0796D3, #53C0F0)',
        'delete': 'linear-gradient(135deg, #D30707, #F05353)',
        'cancelar': 'linear-gradient(135deg, #E7EEFB, #E7EEFB)',
      },
    },
  },
  plugins: [],
};
export default config;
