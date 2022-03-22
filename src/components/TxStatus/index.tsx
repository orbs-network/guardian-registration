import { CircularProgress, makeStyles, Snackbar } from "@material-ui/core";
import useLogic from "./useLogic";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    alignItems: "center",
  },
  spinner: {
    color: "#ffffff",
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    margin: 0,
    marginBottom: 20,
  },
  text: {
    margin: 0,
  },
}));

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TxStatus = observer(() => {
  const show = useLogic();
 

  const classes = useStyles();

  return (
    <Snackbar
      open={show}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert severity="info">
        <div className={classes.container}>
          <p className={classes.text}>Transation Pending</p>
          <CircularProgress className={classes.spinner} size={20} />
        </div>
      </Alert>
    </Snackbar>
  );
});

export default TxStatus;
