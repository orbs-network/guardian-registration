import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface IProps {
  // Dialog
  open: boolean;
  // handleClose: () => void;
  onAccept: () => void;
  onCancel: () => void;

  // Content
  title: string;
  contentText: string;
  acceptText?: string;
  cancelText?: string;
}

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    "& .MuiDialog-paper": {
      border: `4px double ${theme.palette.secondary.main}`,
      boxShadow: "none",
      minWidth: "20rem",
      maxWidth: "100%",
    },
  },
  button: {
    minWidth: "6rem",
  },
}));

export const ActionConfirmationModal = React.memo<IProps>((props) => {
  const classes = useStyles();
  const {
    open,
    onAccept,
    onCancel,
    // handleClose,
    title,
    contentText,
    acceptText,
    cancelText,
  } = props;
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = false;

  console.log({ acceptText });

  return (
    <Dialog
      className={classes.dialogPaper}
      fullScreen={fullScreen}
      open={open}
      onClose={onCancel}
      aria-labelledby="action-confirmation-dialog"
      maxWidth={"xs"}
      style={{}}
    >
      <DialogTitle id="action-confirmation-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          autoFocus
          onClick={onCancel}
          color="secondary"
          variant={"contained"}
        >
          {cancelText || "Cancel"}
        </Button>
        <Button
          className={classes.button}
          onClick={onAccept}
          color="secondary"
          autoFocus
          variant={"contained"}
        >
          {acceptText || "Accept"}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
