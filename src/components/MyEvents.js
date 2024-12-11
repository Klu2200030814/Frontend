import React, { useEffect, useState } from 'react';
import Navbar from './NavBar'; // Ensure the path is correct for your Navbar

const MyEvents = () => {
    const [myEvents, setMyEvents] = useState([]);

    useEffect(() => {
        // Get the registered events from localStorage
        const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents')) || [];
        setMyEvents(registeredEvents);
    }, []);

    const styles = {
        eventList: {
            textAlign: 'left',
            marginTop: '20px',
            background: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
            padding: '20px',
            borderRadius: '10px',
            color: '#fff',
        },
        eventCards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'left',
            gap: '15px',
        },
        eventCard: {
            border: '1px solid #2a9d8f',
            borderRadius: '10px',
            padding: '15px',
            width: '250px',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#1a1a1a',
        },
        eventImage: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '10px',
        },
        eventTitle: {
            fontSize: '20px',
            margin: '10px 0',
            color: '#2a9d8f',
            fontWeight: 'bold',
        },
        eventDescription: {
            fontSize: '14px',
            color: '#ccc',
            marginBottom: '10px',
        },
    };

    return (
        <div>
            {/* Include Navbar */}
            <Navbar />

            {/* Events List */}
            <div style={styles.eventList}>
                {myEvents.length === 0 ? <p>No events registered yet!</p> : (
                    <div style={styles.eventCards}>
                        {myEvents.map((event, index) => (
                            <div style={styles.eventCard} key={index}>
                                <img
                                    src={`http://localhost:8080${event.eventCoverPhoto}`} // Ensure the URL is correct
                                    alt={event.eventTitle}
                                    style={styles.eventImage}
                                />
                                <h3 style={styles.eventTitle}>{event.eventTitle}</h3>
                                <p style={styles.eventDescription}>{event.eventDescription}</p>
                                <p><strong>Registration Starts:</strong> {new Date(event.registrationStartingTime).toLocaleString()}</p>
                                <p><strong>Registration Ends:</strong> {new Date(event.registrationEndingTime).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEvents;
