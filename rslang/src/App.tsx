import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import HomePage from "./components/HomePage/HomePage";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(false);

  const LoadableComponent = Loadable({
    loader: () => import("./components/HomePage/HomePage"),
    loading: LoadingScreen,
    delay: 5300,
  });

  // setTimeout(() => {
  //   setLoading(true);
  // }, 5000);

  // if (!loading) {
  //   return (
  //     <div className="App">
  //       <LoadingScreen />
  //     </div>
  //   );
  // }

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <React.Fragment>
            <Route path="/" component={LoadableComponent} />
          </React.Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
