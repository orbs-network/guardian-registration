import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useModalsTranslations } from "../../../translations/translationsHooks";
import ActionButton from "@bit/orbs-network.commons.action-button";

interface IProps {
  // Dialog
  open: boolean;
  // handleClose: () => void;
  onAccept: () => void;
  onCancel: () => void;

  // Content
  title: string;
  contentText?: string;
  instructionText?: string;
  acceptText?: string;
  cancelText?: string;
}

const useStyles = makeStyles((theme) => ({
  dialogPaper: {
    "& .MuiDialog-paper": {
      backgroundColor: "#0D0D0D",
      border: `4px double ${theme.palette.secondary.main}`,
      boxShadow: "none",
      minWidth: "20rem",
      maxWidth: "100%",
    },
  },
  dialogActions: {
    justifyContent: "space-around",
  },
  dialogTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  dialogContentText: {
    textAlign: "center",
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
    instructionText,
    acceptText,
    cancelText,
  } = props;
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const fullScreen = false;

  const modalsTranslations = useModalsTranslations();

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
      <DialogTitle
        id="action-confirmation-dialog-title"
        className={classes.dialogTitle}
      >
        {title}
      </DialogTitle>
      {contentText && (
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            <Typography>{contentText}</Typography>
          </DialogContentText>
        </DialogContent>
      )}
      <DialogContent>
        <DialogContentText className={classes.dialogContentText}>
          <Typography variant={"body2"}>{instructionText}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <ActionButton
          className={classes.button}
          autoFocus
          onClick={onCancel}
          color="secondary"
          // variant={"contained"}
        >
          {cancelText || modalsTranslations("cancelText_default")}
        </ActionButton>
        <ActionButton
          className={classes.button}
          onClick={onAccept}
          color="secondary"
          autoFocus
          variant={"contained"}
        >
          {acceptText || modalsTranslations("acceptText_default")}
        </ActionButton>
      </DialogActions>
    </Dialog>
  );
});
