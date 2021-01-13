import React from "react";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { renderToString } from "react-dom/server";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { baseTheme } from "../../theme/Theme";
import { useAccountConnectionSectionTranslations } from "../../translations/translationsHooks";

interface IProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const useStyles = makeStyles((theme) => ({
  ticker: {
    color: theme.palette.secondary.dark,
  },
}));

export const CountryLegalTicker = React.memo<IProps>((props) => {
  const classes = useStyles();
  const accountConnectionSectionTranslations = useAccountConnectionSectionTranslations();
  const { value, onValueChange } = props;

  // DEV_NOTE : IMPORTANT: O.L : While 'rendering to string' we will lose the them if not applying it directly inside the rendered component.
  const innerHtmlForLegalAgreement = renderToString(
    <ThemeProvider theme={baseTheme}>
      <Typography>
        {accountConnectionSectionTranslations(
          "ticker_message_confirmIAmNotACitizenOrResident"
        )}
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
            className={classes.ticker}
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
            {accountConnectionSectionTranslations(
              "ticker_subMessage_theStateOfIsrael"
            )}
          </Typography>
        </li>
        <li>
          <Typography style={{ textAlign: "start" }}>
            {accountConnectionSectionTranslations(
              "ticker_subMessage_otherRegions"
            )}
          </Typography>
        </li>
      </ul>
    </>
  );
});
