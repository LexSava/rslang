import "bootstrap/dist/css/bootstrap.min.css";
import "./Main.scss";
import React from "react";
import Study from "../Study/Study";

interface InterfaceMain {}

const Main: React.FC<InterfaceMain> = (props) => {
  return <Study />;
};
export default Main;
