import Modal from "../../../components/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import { createTxBlockExplorerLink } from "../../../utils/web3";
import Link from "@material-ui/core/Link";
import LaunchIcon from "@material-ui/icons/Launch";
const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: '30px 60px 30px 60px',
    width: "fit-content",
  },
  header: {
    position: "relative",
  },
  title: {
    fontSize: 30,
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  subTitle: {
    margin: 0,
    padding: 0,
    marginBottom: 40,
    fontSize: 20,
  },
  spinner: {
    color: "#ffffff",
  },
  link: {
    position: "absolute",
    right: -30,
    top: 0,
  },
});

interface Props {
  chain?: string;
  txHash?: string;
}

function LoadingModal({ chain, txHash }: Props) {
  const classes = useStyles();
  return (
    <Modal>
      <div className={classes.container}>
        <section className={classes.header}>
          {" "}
          <h4 className={classes.title}>Transaction Pending</h4>
          {txHash && (
            <Link
              className={classes.link}
              href={createTxBlockExplorerLink(chain, txHash)}
              target="_blank"
              rel="noreferrer"
            >
              <LaunchIcon style={{color:'white'}} />
            </Link>
          )}
        </section>

        <p className={classes.subTitle}>Don't close the window</p>
        <CircularProgress className={classes.spinner} size={50} />
      </div>
    </Modal>
  );
}

export default LoadingModal;
