import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import TravelerPage from "./Traveler_page";
import Login from "./Login"
import AddTripForm from "./AddTripForm";

function App() {
  const [traveler, setTraveler] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [redirectPath, setRedirectPath] = useState('');

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((traveler) => {
          setTraveler(traveler);
        });
      }
    });
  }, []);

  const handleTripAdded = () => {
    fetch(`/traveler/${traveler.id}/activities`).then((r) => {
      if (r.ok) {
        r.json().then((activities) => {
          setTraveler((prevTraveler) => ({ ...prevTraveler, activities }));
        });
      }
    });
  }

  const handleRedirect = (path) => {
    setRedirectPath(path);
  }

  return (
    <Router>
      {redirectPath && <Redirect to={redirectPath} />}
      <main>
        <Switch>
          <Route path="/" exact> 
            {traveler ? (
              <Home traveler={traveler} setShowSignup={setShowSignup}/>
            ) : (
              <div>
                {!showSignup ? (
                  <div>
                    <h1>Welcome to the Home Page</h1>
                    <Login setTraveler={setTraveler} />
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

          <Route path="/login">
            <Login setTraveler={setTraveler} />
          </Route>

          <Route path="/traveler/:id">
            <TravelerPage setTraveler={setTraveler} />
          </Route>

          <Route path="/add-trip">
            <AddTripForm traveler={traveler} onTripAdded={handleTripAdded} onRedirect={handleRedirect}/>
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
