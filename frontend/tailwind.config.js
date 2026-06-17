/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        primary: '#0052cc',
        'primary-container': '#dce4ff',
        'primary-fixed': '#dce4ff',
        'primary-fixed-dim': '#b3c5ff',
        'on-primary': '#ffffff',
        'on-primary-container': '#001a41',
        'on-primary-fixed': '#001a41',

        // Secondary
        secondary: '#00687a',
        'secondary-container': '#b2ebf7',
        'secondary-fixed': '#b2ebf7',
        'secondary-fixed-dim': '#6ae1ff',
        'on-secondary': '#ffffff',
        'on-secondary-container': '#001f26',
        'on-secondary-fixed': '#001f26',

        // Tertiary
        tertiary: '#6b538c',
        'tertiary-container': '#eddcff',
        'tertiary-fixed': '#eddcff',
        'on-tertiary': '#ffffff',
        'on-tertiary-container': '#260e44',
        'on-tertiary-fixed': '#260e44',

        // Surface
        surface: '#faf8ff',
        'surface-dim': '#d9d9e4',
        'surface-bright': '#faf8ff',
        'surface-container': '#ededf8',
        'surface-container-low': '#f3f1fc',
        'surface-container-high': '#e7e5f0',
        'surface-container-highest': '#e1e0eb',
        'surface-container-lowest': '#ffffff',
        'surface-variant': '#e1e2ec',
        'inverse-surface': '#2e3038',

        // On Surface
        'on-surface': '#191b23',
        'on-surface-variant': '#434654',
        'inverse-on-surface': '#f0f0f7',

        // Outline
        outline: '#737685',
        'outline-variant': '#c3c6d6',

        // Error
        error: '#ba1a1a',
        'on-error': '#ffffff',
        'error-container': '#ffdad6',
        'on-error-container': '#410002',

        // Background
        background: '#f5f5fa',
        'on-background': '#191b23',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-md': ['2.75rem', { lineHeight: '1.15', fontWeight: '700' }],
        'headline-lg': ['1.75rem', { lineHeight: '1.2', fontWeight: '700' }],
        'headline-md': ['1.375rem', { lineHeight: '1.3', fontWeight: '600' }],
        'title-lg': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
        'title-md': ['0.9375rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-md': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.5', fontWeight: '400' }],
        'label-lg': ['0.875rem', { lineHeight: '1.4', fontWeight: '600' }],
        'label-md': ['0.75rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      spacing: {
        'unit': '4px',
        'container-margin': '24px',
        'gutter': '16px',
        'stack-sm': '8px',
        'stack-md': '16px',
        'stack-lg': '24px',
        'comfortable-padding': '16px',
      },
      boxShadow: {
        'level-1': '0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'level-2': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'level-3': '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
