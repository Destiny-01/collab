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
      backgroundColor: {
        shade: " var(--Shade-White, #FFF)",
        milk: "#F0F2F5",
        lightblu: "var(--Secondary-50, #E3EFFC)",
        bl: "var(--primary-400-base, #5758AA)",
      },
      colors: {
        "gray-700": "#344054",
        darkgrey: "var(--Grey-900, #101928)",
        darkblue: "var(--Primary-600, #2C2E80)",
        pgrey: "var(--Grey-500, #667185)",
        dimeblue: "var(--Primary-500, #353799)",
        dimegrey: "#98A2B3",
        tgrey: "#E9E9E9",
        tblue: "#1B1C4D",
        textgrey: "#667185",
        mgrey: "#475367",
        borderblue: "#5758AA",
        "900grey": "#101928",
        lcolor: "#98A2B3",
        "200grey": "#667185",
        "600grey": " #667185",
        "100blue": "#1D2739",
        "50blue": "#D0D5DD",
        "20blue": "#353799",
      },
      borderWidth: {
        "1": "1px",
      },
      borderRadius: {
        "10": "10px",
      },
      borderColor: {
        bcolor: "var(--Grey-300, #D0D5DD)",
        scolor: "var(--Primary-100, #BCBCDD)",
        mcolor: "var(--Shade-White, #FFF)",

        bscolor: "var(--primary-400-base, #5758AA)",
      },
    },
  },
  plugins: [],
};
export default config;
