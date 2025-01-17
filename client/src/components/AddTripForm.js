import React, {useState} from 'react';

function AddTripForm({traveler, onTripAdded, onRedirect}) {
    const [activityName, setActivityName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [season, setSeason] = useState('');
    const [duration, setDuration] = useState('');
    const [price, setPrice] = useState('');
    const [destinationName, setDestinationName] = useState('');
    const [transportation, setTransportation] = useState('');
    const [country, setCountry] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/add_trip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                activity_name: activityName,
                difficulty: difficulty,
                season_for_activity: season,
                duration: duration,
                price: price,
                destination: {
                    name: destinationName,
                    transportation: transportation,
                    country: country
                },
                traveler_id:traveler.id,
            }),
        }).then((r) => {
            if (r.ok) {
                r.json().then((newTrip) => {
                    onTripAdded();
                    onRedirect(`/traveler/${traveler.id}`);
                });
            }
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <h2> Add a New Trip</h2>
            <div>
                <label> Activity name: </label>
                <input type="text" value={activityName} onChange={(e) => setActivityName(e.target.value)} required />
            </div>
            <div>
                <label> Difficulty: </label>
                <input type="text" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} required />
            </div>
            <div>
                <label> Season: </label>
                <input type="text" value={season} onChange={(e) => setSeason(e.target.value)} required />
            </div>
            <div>
                <label> Duration </label>
                <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} required />
            </div>
            <div>
                <label> Price: </label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div>
                <label> Destination Name </label>
                <input type="text" value={destinationName} onChange={(e) => setDestinationName(e.target.value)} required />
            </div>
            <div>
                <label> Transportation: </label>
                <input type="text" value={transportation} onChange={(e) => setTransportation(e.target.value)} required />
            </div>
            <div>
                <label> Country: </label>
                <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
            <button type="submit">Add Trip</button>
        </form>
    );
}

export default AddTripForm;