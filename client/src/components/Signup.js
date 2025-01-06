import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        age: '',
        email: '',
        interests: '',
        favorite_season: ''
    });
    const history = useHistory();

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                history.push('/login');
            } else {
                console.error('signup failed');
            } 
        }   catch (error) {
                console.error('Error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>Username:
            <input 
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            </label>
            <label>Password: 
            <input 
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            </label>
            <label>Age:
            <input 
                type="number" 
                name="age" 
                value={formData.age}
                onChange={handleChange}
            />
            </label>
            <label>Email:
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            </label>
            <label>Interests:
            <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
            />
            </label>
            <label> Favorite Season:
            <input
                type="text"
                name="favorite_season"
                value={formData.favorite_season}
                onChange={handleChange}
            />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default Signup;