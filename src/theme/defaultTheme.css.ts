import { createTheme } from '@vanilla-extract/css';
import { vars } from './contract.css';

export const defaultTheme = createTheme(vars, {
  color: {
    button: {
      primary: {
        backgroundTop: '#4f9cff',
        backgroundBottom: '#1e6ce0',
        border: '#1b5cc1',
        borderDark: '#154a99',
        text: '#ffffff',
      },
      lavender: {
        backgroundTop: '#e6e0f8',
        backgroundBottom: '#c4b0f4',
        border: '#a98ae0',
        borderDark: '#7d5bc2',
        text: '#2e1a47',
      },
      light: {
        backgroundTop: '#ffffff',
        backgroundBottom: '#f2f2f2',
        border: '#ccc',
        borderDark: '#999',
        text: '#333',
      },
    },
    navbar: {
      backgroundTop: '#fff',
      backgroundBottom: '#f2f2f2',
      border: '#ccc',
      text: '#333',
      textActive: '#555',
    },
  },
  radius: {
    button: '4px',
    nav: '4px',
  },
  shadow: {
    button: '0 4px 6px rgba(0, 0, 0, 0.1)',
    nav: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
});
