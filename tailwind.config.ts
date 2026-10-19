import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#09060F", surface: "#140D22", line: "#2A1B45",
        ink: "#EDE9FE", muted: "#8B7FA8",
        neon: "#A855F7", "neon-light": "#C084FC", off: "#4ADE80",
      },
      boxShadow: { neon: "0 0 24px -4px rgba(168,85,247,.55)" },
      fontFamily: { sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
