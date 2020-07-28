import React from "react";
import QuestionsPage from "./pages/QuestionsPage";
import StartPage from "./pages/StartPage";
import ResultsPage from "./pages/ResultsPage"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Global.scss";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/questions">
          <QuestionsPage />
        </Route>
        <Route path="/results">
          <ResultsPage />
        </Route>
        <Route path="/">
          <StartPage />
        </Route>
      </Switch>
    </Router>
  );
}
