/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0B0F1A',
          secondary: '#111827',
        },
        card: {
          DEFAULT: '#1F2937',
        },
        border: {
          DEFAULT: '#2D3748',
        },
        primary: {
          DEFAULT: '#3B82F6',
          cyan: '#22D3EE',
          purple: '#A855F7',
        },
        foreground: {
          DEFAULT: '#F9FAFB',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        }
      },
      backgroundImage: {
        'gradient-bp': 'linear-gradient(135deg, #3B82F6, #A855F7)',
        'gradient-cb': 'linear-gradient(135deg, #22D3EE, #3B82F6)',
      },
      boxShadow: {
        'glow': '0 8px 30px rgba(59, 130, 246, 0.15)',
        'glow-purple': '0 8px 30px rgba(168, 85, 247, 0.15)',
      }
    },
  },
  plugins: [],
}