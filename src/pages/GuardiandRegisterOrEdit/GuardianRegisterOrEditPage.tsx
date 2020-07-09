import React from "react";
import { observer } from "mobx-react";
import {
  useCryptoWalletIntegrationStore,
  useOrbsAccountStore,
} from "../../store/storeHooks";
import { EditGuardianInfoSection } from "./EditGuardianInfoSection";
import { RegisterGuardianSection } from "./RegisterGuardianSection";

interface IProps {}

export const GuardiansRegisterOrEditPage = observer<
  React.FunctionComponent<IProps>
>((props) => {
  const {} = props;

  const orbsAccountStore = useOrbsAccountStore();
  const cryptoWalletIntegrationStore = useCryptoWalletIntegrationStore();

  console.log("Is guardian :", orbsAccountStore.isGuardian);

  // TODO : Start with registration

  if (orbsAccountStore.isGuardian) {
    return (
      <EditGuardianInfoSection
        guardianInfo={orbsAccountStore.guardianInfo}
        guardianAddress={cryptoWalletIntegrationStore.mainAddress}
        updateGuardianDetails={() => console.log("To fill this method")}
      />
    );
  } else {
    return (
      <RegisterGuardianSection
        registerGuardian={(...args) =>
          orbsAccountStore.registerGuardian(...args)
        }
        guardianAddress={cryptoWalletIntegrationStore.mainAddress}
      />
    );
  }
});
