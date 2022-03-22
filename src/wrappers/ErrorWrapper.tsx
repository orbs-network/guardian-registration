import { ReactNode } from "react";

const BaseError = () => {
  return <div>Something went wrong...</div>;
};

interface Props {
  children: ReactNode;
  component?: ReactNode;
  error: boolean;
}

function ErrorWrapper({ children, component = <BaseError />, error }: Props) {
  return error ? <>{component}</> : <>{children}</>;
}

export default ErrorWrapper;
