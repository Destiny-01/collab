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
        "home-gradient":
          "linear-gradient(180deg, rgba(207, 209, 236, 0.26) 0%, rgba(236, 207, 207, 0.29) 100%)",
      },
      colors: {
        "gray-700": "#344054",
      },
    },
  },
  plugins: [],
};
export default config;
