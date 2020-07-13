import { blue } from "@material-ui/core/colors";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const COLOR1 = "#0D0D0D"; // dark gray
const COLOR2 = "#6ec6d8"; // bluish
const COLOR3 = "#03FCF5"; // bright bluish- Tetra

// const PRIMARY_TEXT = '#dbdbdb';
const PRIMARY_TEXT = "#dbdbdb";
const SECONDARY_TEXT = "#7B7B7B";

export const baseTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      // TODO : Adjust all styles after structure is done
      type: "dark",
      primary: {
        main: "rgba(16, 34, 91, 0.7)",
      },
      secondary: {
        main: "#7ccbf4",
      },
      text: {
        // primary: PRIMARY_TEXT,
        // secondary: SECONDARY_TEXT,
      },
      background: {
        // DEV_NOTE : This sets the app background color
        default: "#16317d",
        // paper: "rgba(0, 31, 107, 0.6)",
      },
    },
    typography: {
      // fontFamily: 'Montserrat',
    },
    overrides: {
      MuiPaper: {
        root: {
          // backgroundColor: COLOR1,
        },
      },
      MuiTypography: {
        colorPrimary: {
          // color: PRIMARY_TEXT,
        },
      },
      MuiLink: {
        root: {
          // color: blue[500],
        },
      },
    },
  })
);

export const AppStyles = {};
