import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        futuraBold: ["FuturaPTCondBold", "sans-serif"],
        futuraBoldOblique: ["FuturaPTCondBoldOblique", "sans-serif"],
        futuraExtraBold: ["FuturaPTCondExtraBold", "sans-serif"],
        futuraExtraBoldOblique: ["FuturaPTCondExtraBoldOblique", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "xs-h-p": "1px 1px 0px 0px hsl(var(--accent))",
        "sm-h": "2px 2px 0px 0px hsl(var(--accent))",
        "md-h": "5px 5px 0px 0px hsl(var(--accent))",
        "lg-h": "13px 13px 0px 0px hsl(var(--accent))",
      },
      dropShadow: {
        "xs-h": "1px 1px 0px hsl(var(--accent))",
        "sm-h": "2px 2px 0px hsl(var(--accent))",
        "md-h": "5px 5px 0px hsl(var(--accent))",
        "lg-h": "13px 13px 0px hsl(var(--accent))",
        "sm-h-secondary": "2px 2px 0px hsl(var(--secondary))",
        "md-h-secondary": "5px 5px 0px hsl(var(--secondary))",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-25%)" },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
      },
      textStrokeWidth: {
        xs: "0.5px",
        sm: "1px",
        md: "2px",
        lg: "3px",
        xl: "4px",
        "2xl": "5px",
      },
      textStrokeColor: {
        black: "#000",
        white: "#fff",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",
      },
    },
  },
  plugins: [
    tailwindcssAnimate,
    function ({
      addUtilities,
      theme,
    }: {
      addUtilities: (utils: Record<string, never>) => void;
      theme: (utility: string) => never;
    }) {
      const strokeWidths = theme("textStrokeWidth");
      const strokeColors = theme("textStrokeColor");

      // Generate text stroke width utilities
      const strokeWidthUtilities = Object.entries(strokeWidths).map(
        ([key, value]) => [
          `.text-stroke-${key}`,
          { "text-stroke-width": value, "-webkit-text-stroke-width": value },
        ]
      );

      // Generate text stroke color utilities
      const strokeColorUtilities = Object.entries(strokeColors).map(
        ([key, value]) => [
          `.text-stroke-${key}`,
          { "text-stroke-color": value, "-webkit-text-stroke-color": value },
        ]
      );

      addUtilities(
        Object.fromEntries([...strokeWidthUtilities, ...strokeColorUtilities])
      );
    },
  ],
} satisfies Config;
