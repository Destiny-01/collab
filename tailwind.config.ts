import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      boxShadow: {
        "card-shadow": "0px 1.5px 4px -1px #10192812",
      },
      backgroundImage: {
        "home-gradient":
          "linear-gradient(180deg, rgba(207, 209, 236, 0.26) 0%, rgba(236, 207, 207, 0.29) 100%)",
        "card-bg": "linear-gradient(128.66deg, #824CF6 -0.07%, #693DD3 91.7%)",
      },
      backgroundColor: {
        shade: " var(--Shade-White, #FFF)",
        lightblu: "var(--Secondary-50, #E3EFFC)",
        bl: "var(--primary-400-base, #5758AA)",
      },
      colors: {
        milk: "#F0F2F5",
        purple100: "#f2ecfe",
        purple200: "#e5dafd",
        purple300: "#ccb6fb",
        purple400: "#9065F2",
        purple500: "#824cf6",
        purple600: "#7444dc",
        purple700: "#683dc4",
        purple800: "#5b35ab",
        purple900: "#41267a",
        purple1000: "#0d0818",
        gray900: "#101928",
        gray700: "#344054",
        // darkgrey: "var(--Grey-900, #101928)",
        // darkblue: "var(--Primary-600, #2C2E80)",
        // pgrey: "var(--Grey-500, #667185)",
        // dimeblue: "var(--Primary-500, #353799)",
        dimegrey: "#98A2B3",
        borderColor: "#E4E7EC",
        // tgrey: "#E9E9E9",
        // tblue: "#1B1C4D",
        // textgrey: "#667185",
        // mgrey: "#475367",
        // borderblue: "#5758AA",
        // "900grey": "#101928",
        // lcolor: "#98A2B3",
        // "200grey": "#667185",
        gray600: " #667185",
        // "100blue": "#1D2739",
        // "50blue": "#D0D5DD",
        // "20blue": "#353799",
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
