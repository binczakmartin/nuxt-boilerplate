/**
 * Theme Configuration
 * Customize your app colors here
 */

export const themeConfig = {
  colors: {
    // Primary colors
    primary: '#000000',      // Black
    secondary: '#ffffff',    // White
    
    // Accent colors (customize as needed)
    accent: '#6366f1',       // Indigo
    accentLight: '#818cf8',  // Light Indigo
    success: '#10b981',      // Green
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
    info: '#3b82f6',         // Blue
    
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f8f9fa',
      tertiary: '#f1f3f5',
      dark: '#111827',
      card: '#ffffff',
    },
    
    // Text colors
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      light: '#d1d5db',
      inverse: '#ffffff',
    },
    
    // Border colors
    border: {
      light: '#f3f4f6',
      DEFAULT: '#e5e7eb',
      dark: '#d1d5db',
    }
  },
  
  // Gradients (optional)
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    accent: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    subtle: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  },
  
  // Shadows
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    DEFAULT: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    md: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    lg: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    xl: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  
  // Border radius
  radius: {
    sm: '0.375rem',
    DEFAULT: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    full: '9999px',
  }
}

export type ThemeConfig = typeof themeConfig
