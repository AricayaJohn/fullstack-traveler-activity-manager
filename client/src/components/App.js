import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
// import Signup from "./Signup"
import Login from "./Login"

function App() {

  return (
    <main>
    <Router> 
      <Switch>
          <Route path = "/login" component = {Login} />
          <Route path = "/home" component = {Home} />
      </Switch>
    </Router>
    </main>
  )
}

export default App;
