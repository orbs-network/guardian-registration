import Modal from "../../../components/Modal";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import { createTxBlockExplorerLink } from "../../../utils/web3";
import Link from "@material-ui/core/Link";
import LaunchIcon from "@material-ui/icons/Launch";
import { useModalsTranslations } from "../../../translations/translationsHooks";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px 60px 30px 60px",
    width: "fit-content",
    border: `1px solid ${theme.chain.mainColor}`,
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
}));

interface Props {
  chain?: string;
  txHash?: string;
}

function LoadingModal({ chain, txHash }: Props) {
  const classes = useStyles();
  const modalTranslations = useModalsTranslations()
  return (
    <Modal>
      <div className={classes.container}>
        <section className={classes.header}>
          {" "}
          <h4 className={classes.title}>{modalTranslations('transaction_pending')}</h4>
          {txHash && (
            <Link
              className={classes.link}
              href={createTxBlockExplorerLink(chain, txHash)}
              target="_blank"
              rel="noreferrer"
            >
              <LaunchIcon style={{ color: "white" }} />
            </Link>
          )}
        </section>

        <p className={classes.subTitle}>{modalTranslations('close_window_warning')}</p>
        <CircularProgress className={classes.spinner} size={50} />
      </div>
    </Modal>
  );
}

export default LoadingModal;
