import { MD3LightTheme } from 'react-native-paper';

export const colors = {
  primary: '#0f172a', // slate-900
  text: '#0b1220',
  mutedText: '#6b7280',
  bg: '#f6f7fb',
  surface: '#ffffff',
  border: '#e5e7eb',
  accent: '#3b82f6',
  success: '#22c55e',
  danger: '#ef4444',
};

export const spacing = (n: number) => n * 8;

export const appTheme = {
  ...MD3LightTheme,
  roundness: 12,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.accent,
    background: colors.bg,
    surface: colors.surface,
  },
};
