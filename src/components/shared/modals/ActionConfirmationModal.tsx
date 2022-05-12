import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useModalsTranslations } from "../../../translations/translationsHooks";

interface IProps {
  // Dialog
  open: boolean;
  // handleClose: () => void;
  onAccept: () => void;
  onCancel?: () => void;

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
      <DialogTitle id="action-confirmation-dialog-title">{title}</DialogTitle>
      {contentText && (
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
      )}
      <DialogContent>
        <DialogContentText variant={"body2"}>
          {instructionText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button
            className={classes.button}
            autoFocus
            onClick={onCancel}
            color="secondary"
            variant={"contained"}
          >
            {cancelText || modalsTranslations("cancelText_default")}
          </Button>
        )}
        <Button
          className={classes.button}
          onClick={onAccept}
          color="secondary"
          autoFocus
          variant={"contained"}
        >
          {acceptText || modalsTranslations("acceptText_default")}
        </Button>
      </DialogActions>
    </Dialog>
  );
});
