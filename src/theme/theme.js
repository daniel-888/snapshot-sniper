import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // primary and secondary will appear when component use color prop
    primary: {
      main: '#326abd',
      light: '#ffffff'
    },
    secondary: {
      main: '#326abd',
    },
    background: {
      main: "#73aed8",
      light: "#ffffff",
      lighter: '#3e79d1'
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: '#ffffff',
      light: '#ffffff'
    },
    secondary: {
      main: "#371830",
    },
    background: {
      main: "#000000",
      light: "#11020D",
      lighter: '#5a214d'
    },
  },
});