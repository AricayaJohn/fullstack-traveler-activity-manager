import React, { useEffect, useState } from "react";
import {BrowserRouter as Switch, Route, Router} from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup"
import Login from "./Login"

function App() {
  const [traveler, setTraveler] = useState(null);

  return (
    <main>
    <Router> 
      <Switch>
          <Route exact path = "/">
            <Home traveler={Travelers}/>
          </Route>
      </Switch>
    </Router>
    </main>
  )
}

export default App;
