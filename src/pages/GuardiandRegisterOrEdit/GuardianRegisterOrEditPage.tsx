import React from "react";
import { observer } from "mobx-react";
import { useOrbsAccountStore } from "../../store/storeHooks";
import { EditGuardianInfoSection } from "./EditGuardianInfoSection";
import { RegisterGuardianSection } from "./RegisterGuardianSection";

interface IProps {}

export const GuardiansRegisterOrEditPage = observer<
  React.FunctionComponent<IProps>
>((props) => {
  const {} = props;

  const orbsAccountStore = useOrbsAccountStore();

  console.log("Is guardian :", orbsAccountStore.isGuardian);

  // TODO : Start with registration

  if (orbsAccountStore.isGuardian) {
    return <EditGuardianInfoSection />;
  } else {
    return <RegisterGuardianSection />;
  }
});
