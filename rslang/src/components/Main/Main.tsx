import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.scss";
import React from "react";
import { Container } from "react-bootstrap";
import Study from "../Study/Study";
import Vocabulary from "../Vocabulary/Vocabulary";
import { BrowserRouter, Route, Switch } from "react-router-dom";
interface InterfaceMain {}

const Main: React.FC<InterfaceMain> = (props) => {
  return (
    <Switch>
      <Route exact path="/study" component={Study} />
      <Route path="/vocabulary" component={Vocabulary} />
    </Switch>
  );
};
export default Main;
