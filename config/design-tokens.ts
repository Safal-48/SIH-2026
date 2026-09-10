/**
 * Vaidya Setu - Design Tokens & Visual Architecture
 * Exposes palettes, typography scales, and surface specifications programmatically.
 */

export const designTokens = {
  colors: {
    herbal: {
      primary: "#133E2B",     // 700 - Core Deep Herbal Green
      dark: "#0E2B1E",        // 800
      deepCharcoal: "#07170E",// 950 - Dark mode surface
      medium: "#216849",      // 500
      light: "#4FA87D",       // 300
      pale: "#EBF5EF",        // 50 - Gentle tint
    },
    saffron: {
      accent: "#E5A93B",      // 500 - Warm Ayurvedic Gold / Saffron
      goldLight: "#FAD889",   // 200
      goldDark: "#9E6D15",    // 700
      pale: "#FEF9EC",        // 50
    },
    earth: {
      terracotta: "#C26D30",  // 500 - Sandalwood / Earth tone
      dark: "#753913",        // 800
      pale: "#FAF2EC",        // 50
    },
    surfaces: {
      lightBg: "#FDFCF7",     // Serene ivory background
      lightSurface: "#FFFFFF",
      lightBorder: "#E8E5D8",
      darkBg: "#07170E",      // Charcoal forest
      darkSurface: "#0E2419",
      darkBorder: "#1B3B2B",
    },
  },
  typography: {
    display: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: "1.1",
      fontWeight: "700",
      letterSpacing: "-0.025em",
    },
    h1: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
      lineHeight: "1.2",
      fontWeight: "700",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
      lineHeight: "1.25",
      fontWeight: "600",
      letterSpacing: "-0.015em",
    },
    h3: {
      fontSize: "1.25rem",
      lineHeight: "1.4",
      fontWeight: "600",
      letterSpacing: "-0.01em",
    },
    body: {
      fontSize: "1rem",
      lineHeight: "1.6",
      fontWeight: "400",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: "1.4",
      fontWeight: "500",
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
    },
  },
  shadows: {
    card: "0 4px 20px -2px rgba(19, 62, 43, 0.06), 0 2px 6px -1px rgba(19, 62, 43, 0.04)",
    elevated: "0 12px 32px -4px rgba(19, 62, 43, 0.12), 0 4px 12px -2px rgba(19, 62, 43, 0.06)",
    ayurGlow: "0 0 24px -4px rgba(229, 169, 59, 0.25)",
  },
  radii: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    full: "9999px",
  },
};
