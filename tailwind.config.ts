// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
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
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        alluBlue: {
          DEFAULT: "#3E4797",
          50: "#E4E7FF",
          100: "#C5CBFF",
          200: "#9AA3FF",
          300: "#7A86FF",
          400: "#6074FF",
          500: "#3E4797",
          600: "#303673",
          700: "#232650",
          800: "#1B1C3E",
          900: "#0F1125",
        },
        neon: {
          yellow: "#FFE45E",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "3xl": "1.5rem",
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
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        flip: {
          "0%": { transform: "rotateX(0deg)" },
          "50%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
        // ✅ NEW — scan keyframe
        scan: {
          "0%,100%": { backgroundPosition: "0 0" },
          "50%": { backgroundPosition: "0 8px" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-slow": "pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite",
        "bounce-slow": "bounce 2s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        marquee: "marquee 27s linear infinite",
        flip: "flip 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards",
        // ✅ NEW — scan animation
        scan: "scan 8s linear infinite",
      },
      backgroundImage: {
        "allu-gradient": "radial-gradient(circle at 30% 30%, #6074FF 0%, #3E4797 60%, #1B1C3E 100%)",
        "allu-linear": "linear-gradient(135deg, #6074FF 0%, #3E4797 50%, #1B1C3E 100%)",
        "allu-radial-dark": "radial-gradient(circle at 50% 50%, #303673 0%, #1B1C3E 70%, #0F1125 100%)",
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "16px",
      },
      filter: {
        "brightness-100": "brightness(1)",
        "brightness-125": "brightness(1.25)",
        "contrast-110": "contrast(1.1)",
        "saturate-150": "saturate(1.5)",
      },
      perspective: {
        DEFAULT: "1000px",
      },
      fontSize: {
        "2xs": "0.65rem",
        "3xs": "0.5rem",
      },
      letterSpacing: {
        tighter: "-0.03em",
        "extra-wide": "0.15em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;