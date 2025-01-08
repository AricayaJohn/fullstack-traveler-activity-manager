import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";

function App() {
  const [traveler, setTraveler] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((traveler) => {
          setTraveler(traveler);
        });
      }
    });
  }, []);

  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact> 
            {traveler ? (
              <Home traveler={traveler} />
            ) : (
              <div>
                {!showSignup ? (
                  <div>
                    <h1>Welcome to the Home Page</h1>
                    <Link to="/signup" onClick={() => setShowSignup(true)}>
                      <button>Signup</button>
                    </Link>
                  </div>
                ) : (
                  <Signup setTraveler={setTraveler} />
                )}
              </div>
            )}
          </Route> 
          <Route path="/signup">
            <Signup setTraveler={setTraveler} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
