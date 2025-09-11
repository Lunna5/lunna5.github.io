import { createThemeContract } from '@vanilla-extract/css';

export const vars = createThemeContract({
  color: {
    button: {
      primary: {
        backgroundTop: '',
        backgroundBottom: '',
        border: '',
        borderDark: '',
        text: '',
      },
      lavender: {
        backgroundTop: '',
        backgroundBottom: '',
        border: '',
        borderDark: '',
        text: '',
      },
      light: {
        backgroundTop: '',
        backgroundBottom: '',
        border: '',
        borderDark: '',
        text: '',
      },
    },
    navbar: {
      backgroundTop: '',
      backgroundBottom: '',
      border: '',
      text: '',
      textActive: '',
    },
  },
  radius: {
    button: '',
    nav: '',
  },
  shadow: {
    button: '',
    nav: '',
  },
});
