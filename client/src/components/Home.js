import React from 'react';
import {Link} from 'react-router-dom';
import Login from "./Login";

function Home() {
    return (
        <div>
            <h1> Welcome to the Home Page! </h1>
            <Login />
            <Link to="/signup">
                <button>Signup</button>
            </Link>
        </div>
    );
}
export default Home;