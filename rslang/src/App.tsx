import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  const LoadableComponent = Loadable({
    loader: () => import("./components/HomePage/HomePage"),
    loading: LoadingScreen,
    delay: 300,
  });
  const LoadableTutorialPage = Loadable({
    loader: () => import("./components/TutorialPage/TutorialPage"),
    loading: LoadingScreen,
    delay: 300,
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <React.Fragment>
            <Route path="/" exact component={LoadableComponent} />
            <Route path="/tutorial-page" component={LoadableTutorialPage} />
          </React.Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
