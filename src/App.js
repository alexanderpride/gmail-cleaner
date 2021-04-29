import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import Home from "./pages/home.js";
import Main from "./pages/main.js";
import Redirect from "./pages/redirect.js";


function App() {

  
  return (
    <Router>

      <Switch>

        <Route path={"/redirect"}>
          <Redirect/>
        </Route>

        <Route path={"/main"}>
          <Main/>
        </Route>

        <Route exact path={"/"}>
          <Home/>
        </Route>

      </Switch>

    </Router>
  );
}

export default App;
