import React, {useState} from "react";
import { Redirect } from "react-router-dom";

function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [travelerId, setTravelerId] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password})
        }).then((r) => {
            if (r.ok){
                r.json().then((traveler) => {
                    setUsername(traveler);
                    setLoggedIn(true);
                    setTravelerId(traveler.id)
                });
            }
        });
    };

    if (loggedIn) {
        return <Redirect to={`/traveler/${travelerId}`} />
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type = "text" value = {username} 
                    onChange ={(e) => setUsername(e.target.value)}
                    placeholder = "Username" required />
                <input 
                    type = "password" value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder = "Password" required/>
                <button type = "submit"> Login </button>
                </form>
        </div>
    );
}

export default Login;