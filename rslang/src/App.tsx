import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <React.Fragment>
            <Route path="/" component={HomePage} />
          </React.Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
