import React from "react";
import { Checkbox, FormControlLabel, Typography } from "@material-ui/core";
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "@material-ui/core/styles";
import { baseTheme } from "../../theme/Theme";
import { InTextLink } from "../InTextLink";
import configs from "../../configs";
import {
  useAccountConnectionSectionTranslations,
  useCommonsTranslations,
} from "../../translations/translationsHooks";

interface IProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const LegalTicker = React.memo<IProps>((props) => {
  const { value, onValueChange } = props;
  const accountConnectionSectionTranslations = useAccountConnectionSectionTranslations();
  const commonsTranslations = useCommonsTranslations();

  // DEV_NOTE : IMPORTANT: O.L : While 'rendering to string' we will lose the them if not applying it directly inside the rendered component.
  const innerHtmlForTermsOfUse = renderToString(
    <ThemeProvider theme={baseTheme}>
      <Typography component={"span"} style={{ textAlign: "start" }}>
        <InTextLink
          href={configs.termsOfUseUrl}
          text={commonsTranslations("termsOfUse")}
        />
      </Typography>
    </ThemeProvider>
  );

  const innerHtmlForPrivacyPolicy = renderToString(
    <ThemeProvider theme={baseTheme}>
      <Typography component={"span"}>
        <InTextLink
          href={configs.privacyPolicyUrl}
          text={commonsTranslations("privacyPolicy")}
        />
      </Typography>
    </ThemeProvider>
  );

  // DEV_NOTE : IMPORTANT: O.L : While 'rendering to string' we will lose the them if not applying it directly inside the rendered component.
  // const innerHtmlForLegalAgreement = renderToString(
  //   <ThemeProvider theme={baseTheme}>
  //     <Typography
  //       style={{ textAlign: "start" }}
  //       dangerouslySetInnerHTML={{ __html: renderToString(<div />) }}
  //     >
  //       {accountConnectionSectionTranslations(
  //         "ticker_message_agreeToTheToUAndPrivacyPolicy",
  //         {
  //           termsOfUseText: innerHtmlForTermsOfUse,
  //           privacyPolicyText: innerHtmlForPrivacyPolicy,
  //         }
  //       )}
  //     </Typography>
  //   </ThemeProvider>
  // );

  const innerHtmlForLegalAgreement = accountConnectionSectionTranslations(
    "ticker_message_agreeToTheToUAndPrivacyPolicy",
    {
      termsOfUseText: innerHtmlForTermsOfUse,
      privacyPolicyText: innerHtmlForPrivacyPolicy,
    }
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
          dangerouslySetInnerHTML={{
            __html: innerHtmlForLegalAgreement,
          }}
        />
      }
    />
  );
});
