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
        })
    }
}
