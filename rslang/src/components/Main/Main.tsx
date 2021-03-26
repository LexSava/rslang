import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.scss";
import React from "react";
import { Container } from "react-bootstrap";
import Study from "../Study/Study";
import Vocabulary from "../Vocabulary/Vocabulary";
import Games from "../Games/Games";
import Statistics from "../Statistics/Statistics";
import Settings from "../Settings/Settings";
import { BrowserRouter, Route, Switch } from "react-router-dom";
interface InterfaceMain {}

const Main: React.FC<InterfaceMain> = (props) => {
  return (
    // <Study />
    <Switch>
      <Route exact path="/tutorial-page" component={Study} />
      <Route path="/tutorial-page/vocabulary" component={Vocabulary} />
      <Route path="/tutorial-page/games" component={Games} />
      <Route path="/tutorial-page/statistics" component={Statistics} />
      <Route path="/tutorial-page/settings" component={Settings} />
    </Switch>
  );
};
export default Main;
