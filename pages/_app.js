import "../styles/globals.css";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { StateProvider } from "../Context/StateContext";
// import theme from '../components/Theme'

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e1e1e",
      light: "F0D9FF",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          borderRadius: "",
          "&:hover": {
            opacity: 0.9,
          },
        },
        containedPrimary: {
          backgroundColor: "#BC8CF2",
          color: "#fff",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "F0D9FF" },
          color: "#BC8CF2",
          padding: "15px",
        },
      },
    },
    //  Overiding Icons
    MuiIcon: {
      styleOverrides: {
        root: {
          // Mtch 24px = 3 * 2 + 1.125 * 16
          fontSize: "3rem",
        },
        colorPrimary: {
          color: "#fff",
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "0 23px 23px 0",
          "&$selected": {
            backgroundColor: "#003b4a",
          },

          "&:hover": {
            backgroundColor: "#F0D9FF",
          },
        },
      },
    },
  },
});

// console.log(theme);
function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StateProvider>
  );
}

export default MyApp;
