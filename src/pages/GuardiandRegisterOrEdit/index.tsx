import { observer } from "mobx-react";
import { useOrbsAccountStore } from "../../store/storeHooks";
import { ErrorLoadingPage } from "../error/ErrorLoadingPage";
import { LoadingPage } from "../loading/LoadingPage";
import { GuardianRegistrationPage } from "./guardianRegister/GuardianRegistrationPage";
import { GuardianEditingPage } from "./guardianEdit/GuardiansEditingPage";
import LoadingWrapper from "../../wrappers/LoadingWrapper";
import ErrorWrapper from "../../wrappers/ErrorWrapper";

export const GuardiansRegisterOrEditPage = observer(() => {
  const { errorLoading, doneLoading, isGuardian } = useOrbsAccountStore();
  const loading = !doneLoading && !errorLoading;

  return (
    <ErrorWrapper error={errorLoading} component={<ErrorLoadingPage />}>
      <LoadingWrapper component={<LoadingPage />} isLoading={loading}>
        {isGuardian ? <GuardianEditingPage /> : <GuardianRegistrationPage />}
      </LoadingWrapper>
    </ErrorWrapper>
  );
});
