import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function TravelerPage({ setTraveler }) {
  const { id } = useParams();
  const [traveler, setTravelerData] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetch(`/traveler/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((data) => {
          setTravelerData(data);
          fetch(`/traveler/${id}/activities`).then((res) => {
            if (res.ok) {
              res.json().then((activitiesData) => setActivities(activitiesData));
            }
          });
        });
      }
    });
  }, [id]);

  const handleLogout = () => {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
      if (r.ok) {
        setTraveler(null);
      }
    });
  };

  if (!traveler) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{traveler.username}'s Traveler Page</h1>
      <h2>Destinations and Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.activity_name} at {activity.destination.name}, {activity.destination.country}
          </li>
        ))}
      </ul>
      <Link to="/add-trip">
        <button>Add Trip</button>
      </Link>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default TravelerPage;
