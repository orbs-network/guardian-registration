import React from "react";
import ReactDOM from "react-dom";
import {  BrowserRouter as Router } from "react-router-dom";
import i18n from "i18next";
import "./services/i18n";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {  AppWrapper } from "./wrappers/AppWrapper";
import {  I18nextProvider } from "react-i18next";
import {  StylesProvider,  ThemeProvider } from "@material-ui/styles";
import {  baseTheme } from "./theme/Theme";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <I18nextProvider i18n={i18n}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={baseTheme}>
            <AppWrapper />
          </ThemeProvider>
        </StylesProvider>
      </I18nextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
