import React, {useState} from 'react';

function Signup({setTraveler}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [interests, setInterests] = useState('');
    const [favoriteSeason, setFavoriteSeason] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        switch(name){
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            case 'passwordConfirmation':
                setPasswordConfirmation(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'age':
                setAge(value);
                break;
            case 'interests':
                setInterests(value);
                break;
            case 'favoriteSeason':
                setFavoriteSeason(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username,
                password,
                password_confirmation: passwordConfirmation,
                email,
                age,
                interests,
                favorite_season: favoriteSeason,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((traveler) => setTraveler(traveler));
            }
        });
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Username:
            <input 
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
            />
            </label>
            <label>Password: 
            <input 
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
            />
            </label>
            <label>Age:
            <input 
                type="number" 
                name="age" 
                value={age}
                onChange={handleChange}
            />
            </label>
            <label>Email:
            <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
            />
            </label>
            <label>Interests:
            <input
                type="text"
                name="interests"
                value={interests}
                onChange={handleChange}
            />
            </label>
            <label> Favorite Season:
            <input
                type="text"
                name="favorite_season"
                value={favoriteSeason}
                onChange={handleChange}
            />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}


export default Signup;