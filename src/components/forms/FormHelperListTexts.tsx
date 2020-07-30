import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  header?: React.ReactNode;
  helperTexts: React.ReactNode[];
}

const useStyles = makeStyles((theme) => ({
  helperText: {
    color: theme.palette.secondary.main,
  },
  textsList: {
    listStylePosition: "outside",
    paddingLeft: "1rem",
  },
}));

export const FormHelperListTexts = React.memo<IProps>((props) => {
  const classes = useStyles();
  const { helperTexts, header } = props;
  const lastIndex = helperTexts.length - 1;
  // DEV_NOTE : O.L : Basically we are not supposed to put a 'ul' inside the helper text's 'p'.  It will
  //                  just show warnings on dev.
  // TODO : O.L : FUTURE : Fix this, maybe override the 'p' component to something else.
  return (
    <>
      <ul className={classes.textsList}>
        {helperTexts.map((helperText, index) => (
          <React.Fragment key={`fragment_${helperText}`}>
            <li
              id={index.toString()}
              key={helperText!.toString()}
              className={classes.helperText}
            >
              <Typography
                style={{ wordWrap: "break-word" }}
                variant={"caption"}
              >
                {helperText}
              </Typography>
            </li>
            {/*{index !== lastIndex && <br key={`br_${helperText}`} />}*/}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
});
