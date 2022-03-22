import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import useStyles from "./styles";
import { getSupportedNetworks, triggerNetworkChange } from "../../utils/web3";
import NetworkItem from "./NetworkItem";
import { useHistory, useLocation } from "react-router";
import { removeQueryParam } from "../../utils/url";
import { NETWORK_QUERY_PARAM } from "../../constants";
import configs from "../../configs";
interface IProps {
  chainId: string;
}

const NetworkIndicator = ({ chainId }: IProps) => {
  const history = useHistory();
  const supportedNetworks = getSupportedNetworks() || [];
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef: any = React.useRef(null);
  const location = useLocation();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event: any) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  const selectedNetwork = configs.networks[chainId];
  if (!selectedNetwork) {
    return null;
  }

  const onNetworkSelect = (e: any, id: number) => {
    handleClose(e);
    const network = configs.networks[id];
    if (!network) {
      return;
    }
    const onSuccessfullyChainChanged = () => {
      removeQueryParam(NETWORK_QUERY_PARAM, history, location.search);
    };

    const {
      name: chainName,
      nativeCurrency,
      rpcUrls,
      blockExplorerUrls,
    } = network;
    triggerNetworkChange(
      id,
      { chainName, nativeCurrency, rpcUrls, blockExplorerUrls },
      onSuccessfullyChainChanged
    );
  };

  return (
    <div className={classes.root}>
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <NetworkItem img={selectedNetwork.logo} name={selectedNetwork.name} />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    {supportedNetworks
                      .filter((n: number) => n !== Number(chainId))
                      .map((id: number, index: number) => {
                        const network = configs.networks[id];
                        if (!network) {
                          return null;
                        }
                        return (
                          <MenuItem
                            onClick={(e) => onNetworkSelect(e, id)}
                            key={index}
                          >
                            <NetworkItem
                              img={network.logo}
                              name={network.name}
                            />
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default NetworkIndicator;
