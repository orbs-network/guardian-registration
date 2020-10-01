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
>((props) => {
  const orbsAccountStore = useOrbsAccountStore();

  // TODO : ORL : Organize all of this loading "ifs"
  if (orbsAccountStore.errorLoading) {
    return <ErrorLoadingPage />;
  }

  if (!orbsAccountStore.doneLoading) {
    return <LoadingPage />;
  }

  if (orbsAccountStore.isGuardian) {
    return <GuardianEditingPage />;
  } else {
    return <GuardianRegistrationPage />;
  }
});
