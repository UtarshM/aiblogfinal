/**
 * Tailwind CSS Configuration
 * Primary Color: #52b2bf (Teal/Cyan)
 * MacBook-style UI/UX Design
 * 
 * @author Scalezix Venture PVT LTD
 * @copyright 2025 All Rights Reserved
 */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color and shades
        primary: {
          50: '#eef9fa',
          100: '#d5f0f3',
          200: '#afe3e9',
          300: '#7dd0da',
          400: '#52b2bf', // Main primary color
          500: '#3299a8',
          600: '#2a7b8d',
          700: '#276474',
          800: '#265260',
          900: '#244552',
          950: '#132d37',
        },
        // Accent colors
        accent: {
          light: '#7dd0da',
          DEFAULT: '#52b2bf',
          dark: '#3299a8',
        },
        // Glass effect colors
        glass: {
          white: 'rgba(255, 255, 255, 0.8)',
          dark: 'rgba(0, 0, 0, 0.1)',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(82, 178, 191, 0.1)',
        'glass-lg': '0 25px 50px -12px rgba(82, 178, 191, 0.15)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'mac': '0 22px 70px 4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '20px',
      },
      borderRadius: {
        'mac': '12px',
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'bounceOut 0.3s ease-in',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.2s ease-in',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-soft': 'pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.3)', opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(82, 178, 191, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(82, 178, 191, 0.8)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
