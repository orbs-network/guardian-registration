import React, { DetailedHTMLProps } from "react";
import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { BoldText } from "../texts/boldText";

export type TInnerHtmlFunction = () => string;

interface IProps {
  conceptName: string;
  details: Array<string | TInnerHtmlFunction>;
  caption?: boolean;
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "start",
    padding: "0.5em",
  },
  textsList: {
    listStylePosition: "outside",
    paddingLeft: "1.5rem",

    "& li": {
      margin: "0 0 0.2rem 0",
    },
    "& li:last-child": {
      margin: 0,
    },
  },
}));

export const DetailsList = React.memo<
  IProps &
    DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props) => {
  const classes = useStyles();
  const { conceptName, details, caption, ...others } = props;

  return (
    <div className={classes.container} {...others}>
      <Typography>
        Your <BoldText>{conceptName}:</BoldText>
      </Typography>
      <ul className={classes.textsList}>
        {details.map((detail) => (
          <li key={detail!.toString()}>
            {typeof detail === "string" ? (
              <Typography variant={caption ? "caption" : "body2"}>
                {detail}
              </Typography>
            ) : (
              <Typography
                variant={caption ? "caption" : "body2"}
                dangerouslySetInnerHTML={{ __html: detail() }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
});
