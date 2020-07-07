import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch, useLocation } from "react-router-dom";

function App() {
  return (
    <main className="App">
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
      <ContentContainer id={"appContainer"}>
        <Switch>
          <Route path={"/"}>
            <div>Hello</div>
          </Route>
        </Switch>
      </ContentContainer>
    </main>
  );
}

export default App;
