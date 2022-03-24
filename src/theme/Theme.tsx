import { createTheme } from "@material-ui/core";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import configs, { INetwork } from "../configs";

declare module '@material-ui/core/styles' {
  interface CustomTheme {
    chain: {
      mainColor: string;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}


// const PRIMARY_TEXT = '#dbdbdb';
const PRIMARY = "#ffffff";
const SECONDARY_TEXT = "#d0d0d0";
// const SECONDARY_TEXT = "#7B7B7B";

// DEV_NOTE : Most palette colors taken from https://material-ui.com/customization/palette/#dark-mode

export const HEADER_HEIGHT_REM = 5;

export const getTheme = (chain: string) =>  {
    const color = chain ?  configs.networks[chain].color : 'white'
  return responsiveFontSizes(
    createTheme({
      chain: {
        mainColor: color
      },
      palette: {
        // TODO : Adjust all styles after structure is done
        // type: "dark",
        primary: { main: "#09142c", light: "#ffffff" },
  
        secondary: {
          main:PRIMARY,
        },
        text: {
          primary: PRIMARY,
          secondary: PRIMARY,
          disabled: "rgba(255, 255, 255, 0.5)",
          // secondary: SECONDARY_TEXT,
        },
        
        background: {
          // DEV_NOTE : This sets the app background color
          default: "#16317d",
          // paper: "rgba(0, 31, 107, 0.6)",
          paper: "#09142c",
        },
        action: {
          active: PRIMARY,
          disabled: "rgba(255, 255, 255, 0.3)",
          disabledBackground: "rgba(255, 255, 255, 0.12)",
          hover: "rgba(255, 255, 255, 0.08)",
          selected: "rgba(255, 255, 255, 0.16)",
        },
        divider: "rgba(255, 255, 255, 0.12)",
      },
     
      overrides: {
        MuiPaper: {
          root: {
            // backgroundColor: COLOR1,
          },
        },
        MuiCheckbox: {
            colorSecondary: {
              color: PRIMARY
            }
        },
        MuiTypography: {
          colorPrimary: {
             color: PRIMARY,
          },
        },
        MuiLink: {
          root: {
            // color: blue[500],
          },
        },
      },
    })
  )
};

export const AppStyles = {};
