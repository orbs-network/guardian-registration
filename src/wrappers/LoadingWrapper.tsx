import { ReactNode } from "react";

const BaseLoader = () => {
  return <div>Loading...</div>;
};

interface Props {
  children: ReactNode;
  component?: ReactNode;
  isLoading: boolean;
}

function LoadingWrapper({
  children,
  component = <BaseLoader />,
  isLoading,
}: Props) {
  return isLoading ? <>{component}</> : <>{children}</>;
}

export default LoadingWrapper;
