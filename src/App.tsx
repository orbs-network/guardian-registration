import React from "react";
import "./App.css";
import { ContentContainer } from "./components/structure/ContentContainer";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <main className="App">
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
