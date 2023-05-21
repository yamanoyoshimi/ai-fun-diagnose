// https://mui.com/customization/theme-components/#global-style-overrides

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    muted: Palette['primary'];
  }
  interface PaletteOptions {
    muted: PaletteOptions['primary'];
  }
}

export const themePalette = {
  palette: {
    primary: {
      main: '#000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#F23030',
    },
    muted: {
      main: '#000',
      contrastText: 'rgba(34, 34, 34, .6)', // Text/Secondary: rgba(#222, .6)
    },
    background: {
      default: '#F0F0F3',
      paper: '#FFFFFF',
    },
  },
};

export const ThemeTypography = {
  typography: {
    fontSize: 14,
  },
};

// Create a theme instance.
const theme = createTheme({
  ...themePalette,
  ...ThemeTypography,
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // fontSize: '1rem',
        },
      },
    },
  },
});

export default theme;
