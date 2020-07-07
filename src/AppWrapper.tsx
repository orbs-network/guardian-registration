import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

interface IProps {}

export const AppWrapper = React.memo<IProps>((props) => {
  return (
    <Router>
      <App />
    </Router>
  );
});
