import React from "react";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "@material-ui/core/styles";
import { baseTheme } from "../../theme/Theme";

interface IProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const CountryLegalTicker = React.memo<IProps>((props) => {
  const { value, onValueChange } = props;

  // DEV_NOTE : IMPORTANT: O.L : While 'rendering to string' we will lose the them if not applying it directly inside the rendered component.
  const innerHtmlForLegalAgreement = renderToString(
    <ThemeProvider theme={baseTheme}>
      <Typography>
        I confirm that I am not a citizen, resident of, or otherwise located in
        any of the following:
      </Typography>
    </ThemeProvider>
  );

  return (
    <>
      <FormControlLabel
        style={{
          marginTop: "0.5rem",
        }}
        control={
          <Checkbox
            checked={value}
            onChange={(e) => onValueChange(e.target.checked)}
            name={"legalTicker"}
          />
        }
        label={
          <Typography
            style={{ textAlign: "start" }}
            // onClick={(e) => e.preventDefault()}
            dangerouslySetInnerHTML={{ __html: innerHtmlForLegalAgreement }}
          />
        }
      />
      <ul>
        <li>
          <Typography style={{ textAlign: "start" }}>
            The State of Israel.
          </Typography>
        </li>
        <li>
          <Typography style={{ textAlign: "start" }}>
            Any country or region subject to comprehensive sanctions, including,
            but not limited to, the Crimean region of Ukraine, Cuba, Iran,
            Lebanon, North Korea, Sudan and Syria.
          </Typography>
        </li>
      </ul>
    </>
  );
});
