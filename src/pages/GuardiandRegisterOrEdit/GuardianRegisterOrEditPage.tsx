import React from "react";
import { observer } from "mobx-react";
import { useOrbsAccountStore } from "../../store/storeHooks";
import { ErrorLoadingPage } from "../error/ErrorLoadingPage";
import { LoadingPage } from "../loading/LoadingPage";
import { GuardianRegistrationPage } from "./guardianRegister/GuardianRegistrationPage";
import { GuardianEditingPage } from "./guardianEdit/GuardiansEditingPage";

interface IProps {}

export const GuardiansRegisterOrEditPage = observer<
  React.FunctionComponent<IProps>
>(() => {
  console.log('render')
  const orbsAccountStore = useOrbsAccountStore();
  // TODO : ORL : Organize all of this loading "ifs"
  if (orbsAccountStore.errorLoading) {
    return <ErrorLoadingPage />;
  }
  console.log(orbsAccountStore.doneLoading)
  if (!orbsAccountStore.doneLoading) {
    return <LoadingPage />;
  }

  if (orbsAccountStore.isGuardian) {
    return <GuardianEditingPage />;
  } else {
    return <GuardianRegistrationPage />;
  }
});
