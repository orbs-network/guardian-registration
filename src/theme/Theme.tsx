import { blue } from "@material-ui/core/colors";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const COLOR1 = "#0D0D0D"; // dark gray
const COLOR2 = "#6ec6d8"; // bluish
const COLOR3 = "#03FCF5"; // bright bluish- Tetra

// const PRIMARY_TEXT = '#dbdbdb';
const PRIMARY_TEXT = "#dbdbdb";
const SECONDARY_TEXT = "#d0d0d0";
// const SECONDARY_TEXT = "#7B7B7B";

// DEV_NOTE : Most palette colors taken from https://material-ui.com/customization/palette/#dark-mode

export const HEADER_HEIGHT_REM = 5;

export const baseTheme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      // TODO : Adjust all styles after structure is done
      // type: "dark",
      primary: { main: "#09142c" },
      secondary: {
        main: "#74f6fd",
      },
      text: {
        primary: PRIMARY_TEXT,
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.5)",
        // secondary: SECONDARY_TEXT,
      },
      background: {
        // DEV_NOTE : This sets the app background color
        default: "#000000",
        // paper: "rgba(0, 31, 107, 0.6)",
        paper: "#0D0D0D",
      },
      action: {
        active: PRIMARY_TEXT,
        disabled: "rgba(255, 255, 255, 0.3)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        hover: "rgba(255, 255, 255, 0.08)",
        selected: "rgba(255, 255, 255, 0.16)",
      },
      divider: "rgba(255, 255, 255, 0.12)",
    },
    typography: {
      // fontFamily: 'Montserrat',
    },
  })
);

export const AppStyles = {};
