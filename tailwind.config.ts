import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    // Some useful comment
    fontFamily: {
      valky: ["var(--font-valky)"], // Ensure fonts with spaces have " " surrounding it.
    },
    colors: {
      "primary-color": "#f2DA85",
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
export default config;
