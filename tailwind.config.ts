import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        white: "#FFFFFF",
        black: "#000000",
        light: "#F6F6F6",
        dark: "#110529",
        "btn-mn-background": "#55FFE2",
        gray: {
          200: "#00000053",
          700: "#0000009A",
        },
        red: {
          normal: "#F26A6C",
          faded: "#F26A6CBF",
        },
        orange: {
          normal: "#F3911C",
          faded: "#F3911CBF",
        },
        yellow: {
          normal: "#FFC419",
          faded: "#FFC419BF",
        },
        lightGreen: {
          normal: "#91CE4C",
          faded: "#91CE4CBF",
        },
        green: {
          normal: "#48B65A",
          faded: "#48B65ABF",
        },
        lightBlue: {
          normal: "#22AFE3",
          faded: "#22AFE3BF",
        },
        blue: {
          normal: "#2A80D8",
          faded: "#2A80D8BF",
        },
        darkBlue: {
          normal: "#1966B5",
          faded: "#1966B5BF",
        },
        purple: {
          normal: "#8C65AE",
          faded: "#8C65AEBF",
        },
        try: "#F26A6C",
      },

      textColor: {
        white: "#FFFFFF",
        black: "#000000",
        dark: "#110529",
        gray: "#FFFFFFBE",
        try: "#55FFE2",
      },
      zIndex: {
        10: "10",
        100: "100",
        1000: "1000",
      },
    },
  },
  plugins: [],
};
export default config;
