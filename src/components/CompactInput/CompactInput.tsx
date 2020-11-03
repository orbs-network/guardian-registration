import React from "react";
import { Typography } from "@material-ui/core";

interface IProps {
  title: string;
  value: string;
}

export const CompactInput = React.memo<IProps>((props) => {
  const { title, value } = props;
  return (
    <div>
      <Typography component={"span"} style={{ fontWeight: "bold" }}>
        {title} :
      </Typography>
      <Typography component={"span"} style={{}}>
        {value}
      </Typography>
    </div>
  );
});
