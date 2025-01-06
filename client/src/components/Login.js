import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function Login () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password})
        });
        if (response.ok){
            //const data = await response.json();
            history.push('/home');
        } else {
            alert('Unauthorized login');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type = "text" value = {username} 
                onChange ={(e) => setUsername(e.target.value)}
                placeholder = "Username" required />
            <input 
                type = "text" value = {password}
                onChange = {(e) => setPassword(e.target.value)}
                placeholder = "Password" required/>
                <button type = "submit"> Submit </button>
            </form>
    );
}

export default Login;