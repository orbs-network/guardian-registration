import { Page } from "../../../components/structure/Page";
import { ContentFitting } from "../../../components/structure/ContentFitting";

import { RegisterGuardianSection } from "./RegisterGuardianSection";
import { makeStyles } from "@material-ui/core/styles";
import { DelegatingToOtherAccountSection } from "./DelegatingToOtherAccountSection";
import { observer } from "mobx-react";
import LoadingModal from "./LoadingModal";
import useLogic from "./useLogic";
import { createTxBlockExplorerLink } from "../../../utils/web3";

export const GuardianRegistrationPage = observer(() => {
  const {
    orbsAccountStore,
    cryptoWalletIntegrationStore,
    unDelegate,
    registerGuardian,
    cryptoWalletIntegrationService,
    chain,
  } = useLogic();

  return (
    <Page>
      <ContentFitting>
        {/* Content  */}
        <div
          style={{
            display: "flex",
            maxWidth: "100%",
          }}
        >
          {orbsAccountStore.isDelegatingToOtherAccount && (
            <DelegatingToOtherAccountSection
              userAddress={cryptoWalletIntegrationStore.mainAddress}
              currentSelectedGuardianAddress={
                orbsAccountStore.selectedGuardianAddress || ""
              }
              unDelegate={unDelegate}
            />
          )}

          {!orbsAccountStore.isDelegatingToOtherAccount && (
            <RegisterGuardianSection
              registerGuardian={registerGuardian}
              guardianAddress={cryptoWalletIntegrationStore.mainAddress}
              cryptoWalletConnectionService={cryptoWalletIntegrationService}
            />
          )}
        </div>
        {orbsAccountStore.txPending && (
          <LoadingModal chain={chain} txHash={orbsAccountStore.txHash} />
        )}
      </ContentFitting>
    </Page>
  );
});
