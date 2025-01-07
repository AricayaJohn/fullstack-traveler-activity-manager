import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup"

function App() {

  return (
    <main>
      <Router> 
        <Switch>
            <Route path = "/" component = {Home} />
            <Route path = "/signup" component = {Signup} />
        </Switch>
      </Router>
    </main>
  )
}

export default App;
