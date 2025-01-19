import React, {useEffect, useState} from 'react';

function EditTripForm({ tripId, onRedirect }) {
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        fetch(`/activities/${tripId}`).then((r) => {
            if (r.ok) {
                r.json().then((data) => {
                    setTrip(data);
                });
            }
        });
    }, [tripId]);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`/activities/${tripId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(trip),
        }).then((r)=> {
            if (r.ok) {
                onRedirect(`/traveler/${trip.traveler_id}`);
            }
        });
    };

    const handleDelete = () => {
        fetch(`/activities/{tripID}`, {
            method: 'DELETE',
        }).then((r) => {
            if (r.ok) {
                onRedirect(`/traveler/${trip.traveler_id}`);
            }
        });
    };

    if (!trip) 
        return <div>Loading</div>
    
    return (
        <form onSubmit={handleSubmit}>
            <h2> Edit Trip </h2>
            <div>
                <label> Activity Name: </label>
                <input 
                    type = "text"
                    value = {trip.activity_name}
                    onChange = {(e) => setTrip({ ...trip, activity_name: e.target.value })}
                    required
                />
            </div>
            <div>
                <label> Difficulty</label>
                <input 
                    type = "text"
                    value = {trip.difficulty}
                    onChange = {(e) => setTrip({ ...trip, difficulty: e.target.value })}
                />
            </div>
            <div>
                <label> Season: </label>
                <input 
                    type = "text"
                    value = {trip.season_for_activity}
                    onChange = {(e) => setTrip({ ...trip, season_for_activity: e.target.value })}
                />
            </div>
            <div>
                <label> Duration: </label>
                <input 
                    type = "text"
                    value = {trip.duration}
                    onChange = {(e) => setTrip({ ...trip, duration: e.target.value })}
                />
            </div>
            <div>
                <label> Price: </label>
                <input 
                    type = "text"
                    value = {trip.price}
                    onChange= {(e) => setTrip({ ...trip, price: e.target.value})}
                />
            </div>
            <div>
                <label> Price: </label>
                <input 
                    type = "text"
                    value = {trip.price}
                    onChange= {(e) => setTrip({ ...trip, price: e.target.value})}
                />
            </div>
            <div>
                <label> Destination Name: </label>
                <input 
                    type = "text"
                    value = {trip.destination.name}
                    onChange= {(e) => setTrip({ ...trip, destination: { ...trip.destination, name: e.target.value} })}
                />
            </div>
            <div>
                <label> transportation: </label>
                <input 
                    type = "text"
                    value = {trip.transportation}
                    onChange= {(e) => setTrip({ ...trip, destination: { ...trip.destination, transportation: e.target.value} })}
                />
            </div>
            <div>
                <label> country: </label>
                <input 
                    type = "text"
                    value = {trip.country}
                    onChange= {(e) => setTrip({ ...trip, destination: { ...trip.destination, country: e.target.value} })}
                />
            </div>
            <button type = "submit"> Submit Changes</button>
            <button type = "button" onClick = {handleDelete}>Delete Activity</button>
        </form>
    );
}

export default EditTripForm