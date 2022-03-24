import { Typography } from "@material-ui/core";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import { makeStyles } from "@material-ui/styles";
import { useHistory, useLocation } from "react-router";
import ActionButton from "../shared/ActionButton";
import { triggerNetworkChange } from "../../utils/web3";
import { NETWORK_QUERY_PARAM } from "../../constants";
import configs, { INetwork } from "../../configs";
import { removeQueryParam } from "../../utils/url";

const useStyles = makeStyles({
  container: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: 9999,
    color:'white'
  },
  containerContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    flexDirection: "column",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnsContainer: {
    marginTop: 30,
    display: "flex",
  },
  networkBtn: {
    marginRight: 20,
    border:'1px solid white',
    "&:last-child": {
      marginRight: 0,
    },
  },
  title: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: 500,
    textAlign: "center",
  },
  icon: {
    fontSize: 60,
  },
  text: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
  },
  overlay: {
    width: "100%",
    height: "100%",
    background: "black",
    opacity: "0.9",
  },
});

interface IProps {
  availableChains?: number[];
  selectedChain: number;
}

function WrongNetwork({ availableChains = [], selectedChain }: IProps) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const onSubmit = (id: number, network: INetwork) => {
    const {
      nativeCurrency,
      rpcUrls,
      blockExplorerUrls,
      name: chainName,
    } = network;
    const onNetworkChanged = () => {
      removeQueryParam(NETWORK_QUERY_PARAM, history, location.search);
    };

    triggerNetworkChange(
      id,
      { chainName, nativeCurrency, rpcUrls, blockExplorerUrls },
      onNetworkChanged
    );
  };

  return (
    <div className={classes.container}>
      <section className={classes.overlay}></section>
      <div className={classes.containerContent}>
        <Typography className={classes.title}>Oops, wrong network!</Typography>
        <LinkOffIcon className={classes.icon} />
        <Typography className={classes.text}>
          Please change the network
        </Typography>
        <div className={classes.btnsContainer}>
          {availableChains
            .filter((c) => c !== selectedChain)
            .map((availableChain, index) => {
              const network = configs.networks[availableChain];
              if (!network) {
                return null;
              }
              return (
                <ActionButton
                  className={classes.networkBtn}
                  key={index}
                  style={{color:'white'}}
                  onClick={() => onSubmit(availableChain, network)}
                >
                  {network.name}
                </ActionButton>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default WrongNetwork;

