import React, {useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TravelerPage({traveler}) {
    const [activities, setActivities] = useState([]) 
}
    useEffect(() => {
        fetch('/traveler/${traveler.id}').then((r) => {
            if (r.ok) {
                r.json().then((data) => setActivities(data))
            }
        });
    }, [traveler.id]);

    const handleLogout = () => {
        fetch('/logout',{method: 'DELETE'}).then((r)=>{
            if(r.ok){
                setTraveler(null);
            }
        });
    };

    return(
        <div>
            <h1>{traveler.username}'s Traveler Page</h1>
            <h2>Destination and Activities</h2>
            <ul>
                {activities.map((activity) => (
                    <li key = {activity.id}>
                        {activity.activity_name} at {activity.destination.name}, {activity.destination.country}
                    </li>
                ))}
            </ul>
            <Link to="/add-trip">
                <button>Add Trip</button>
            </Link>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )

export default TravelerPage;