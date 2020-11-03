import React from "react";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "@material-ui/core/styles";
import { baseTheme } from "../../theme/Theme";
import { InTextLink } from "../InTextLink";
import configs from "../../configs";

interface IProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const LegalTicker = React.memo<IProps>((props) => {
  const { value, onValueChange } = props;

  // DEV_NOTE : IMPORTANT: O.L : While 'rendering to string' we will lose the them if not applying it directly inside the rendered component.
  const innerHtmlForLegalAgreement = renderToString(
    <ThemeProvider theme={baseTheme}>
      <Typography style={{ textAlign: "start" }}>
        I agree to the{" "}
        <InTextLink href={configs.termsOfUseUrl} text={"Terms of Use"} /> and{" "}
        <InTextLink href={configs.privacyPolicyUrl} text={"Privacy Policy"} />
      </Typography>
    </ThemeProvider>
  );

  return (
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
          // onClick={(e) => e.preventDefault()}
          dangerouslySetInnerHTML={{ __html: innerHtmlForLegalAgreement }}
        />
      }
    />
  );
});
