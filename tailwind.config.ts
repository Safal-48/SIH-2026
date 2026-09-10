import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(var(--herbal-50))",
          100: "hsl(var(--herbal-100))",
          200: "hsl(var(--herbal-200))",
          300: "hsl(var(--herbal-300))",
          400: "hsl(var(--herbal-400))",
          500: "hsl(var(--herbal-500))",
          600: "hsl(var(--herbal-600))",
          700: "hsl(var(--herbal-700))",
          800: "hsl(var(--herbal-800))",
          900: "hsl(var(--herbal-900))",
          950: "hsl(var(--herbal-950))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "hsl(var(--earth-50))",
          100: "hsl(var(--earth-100))",
          200: "hsl(var(--earth-200))",
          300: "hsl(var(--earth-300))",
          400: "hsl(var(--earth-400))",
          500: "hsl(var(--earth-500))",
          600: "hsl(var(--earth-600))",
          700: "hsl(var(--earth-700))",
          800: "hsl(var(--earth-800))",
          900: "hsl(var(--earth-900))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: "hsl(var(--saffron-50))",
          100: "hsl(var(--saffron-100))",
          200: "hsl(var(--saffron-200))",
          300: "hsl(var(--saffron-300))",
          400: "hsl(var(--saffron-400))",
          500: "hsl(var(--saffron-500))",
          600: "hsl(var(--saffron-600))",
          700: "hsl(var(--saffron-700))",
          800: "hsl(var(--saffron-800))",
          900: "hsl(var(--saffron-900))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Dedicated Ayurvedic Tone Tokens
        herbal: {
          50: "hsl(145, 45%, 96%)",
          100: "hsl(145, 40%, 90%)",
          200: "hsl(147, 36%, 80%)",
          300: "hsl(149, 34%, 64%)",
          400: "hsl(151, 38%, 46%)",
          500: "hsl(153, 48%, 32%)",
          600: "hsl(154, 52%, 25%)",
          700: "hsl(155, 56%, 19%)", // Deep herbal green
          800: "hsl(156, 58%, 14%)",
          900: "hsl(158, 62%, 9%)",
          950: "hsl(160, 70%, 5%)",  // Charcoal forest
        },
        earth: {
          50: "hsl(28, 45%, 97%)",
          100: "hsl(28, 42%, 92%)",
          200: "hsl(27, 40%, 82%)",
          300: "hsl(26, 38%, 68%)",
          400: "hsl(25, 42%, 52%)",
          500: "hsl(24, 50%, 40%)", // Terracotta / Sandalwood tone
          600: "hsl(23, 52%, 33%)",
          700: "hsl(22, 54%, 26%)",
          800: "hsl(21, 56%, 20%)",
          900: "hsl(20, 58%, 14%)",
        },
        saffron: {
          50: "hsl(45, 100%, 96%)",
          100: "hsl(43, 96%, 88%)",
          200: "hsl(41, 94%, 76%)",
          300: "hsl(39, 92%, 62%)",
          400: "hsl(37, 90%, 51%)",
          500: "hsl(36, 92%, 46%)", // Warm Ayurvedic Gold / Saffron
          600: "hsl(34, 94%, 38%)",
          700: "hsl(31, 92%, 30%)",
          800: "hsl(28, 90%, 23%)",
          900: "hsl(25, 88%, 17%)",
        },
        ivory: {
          DEFAULT: "hsl(44, 40%, 98%)",
          dark: "hsl(42, 28%, 94%)",
          surface: "hsl(44, 30%, 96%)",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Georgia", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-subtle": "pulse-subtle 4s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
