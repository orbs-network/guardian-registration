import React from "react";
import { Tabs, TabsProps } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { TabsTypeMap } from "@material-ui/core/Tabs/Tabs";
import { makeStyles } from "@material-ui/core/styles";

interface IProps {
  // DEV_NOTE : O.L : I have added this prop because of TS problems with 'onChange', consider removing this prop
  onTabValueChange: (newTabValue: string) => void;
}

const useStyles = makeStyles((theme) => ({
  tabsHeader: {
    // borderBottom: "1px solid #f0f0f0",
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
  },
}));

export const TabsHeader = React.memo<IProps & TabsProps>((props) => {
  const classes = useStyles();
  const { onTabValueChange, children, ...tabsProps } = props;
  return (
    <Tabs
      onChange={(event: React.ChangeEvent<{}>, value: any) =>
        onTabValueChange(value)
      }
      indicatorColor="secondary"
      textColor="primary"
      TabIndicatorProps={{
        color: "secondary",
      }}
      scrollButtons={"auto"}
      variant="fullWidth"
      {...tabsProps}
      className={classes.tabsHeader}
    >
      {children}
    </Tabs>
  );
});
