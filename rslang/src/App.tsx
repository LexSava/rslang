import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage/HomePage";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 5000);

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
            <Route path="/" component={HomePage} />
          </React.Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
export default App;
