import {ReactNode} from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {default as MaterialModal} from "@material-ui/core/Modal";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width:'fit-content',
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
     
      left:'50%',
      top:'50%',
      transform:'translate(-50%, -50%)'
    },
  })
);

interface Props {
  children: ReactNode;
}

const Modal = ({ children}: Props) => {
  const classes = useStyles();


  return (
    <MaterialModal
    open={true}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <div className={classes.paper}> {children}</div>
  </MaterialModal>
  );
}
export default Modal