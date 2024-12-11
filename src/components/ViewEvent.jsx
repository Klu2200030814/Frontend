import React, { useEffect, useState } from 'react';
import { getAllEvents, deleteEvent, updateEvent } from '../services/api';
import AdminNavbar from './AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css';
const ViewEvent = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventData = await getAllEvents();
                setEvents(eventData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDelete = async (eventId) => {
        
            try {
                await deleteEvent(eventId);
                setEvents(events.filter(event => event.id !== eventId));
                toast.success("Event Deleted Successfully")
            } catch (err) {
                toast.error("Invalid!")
            }
    };

    // const handleUpdate = async (eventId) => {
    //     try {
    //         await updateEvent({ ...formData, eventId }); // Pass the eventId along with updated data
    //         setEvents(events.map(event => (event.id === eventId ? { ...event, ...formData } : event)));
    //         alert("Event updated successfully!");
    //         setSelectedEvent(null); // Close the update form
    //     } catch (err) {
    //         setError(err.message);
    //         alert("Failed to update event");
    //     }
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const formatDateTime = (dateString) => new Date(dateString).toLocaleString();

    const styles = {
        eventList: {
            textAlign: 'center',
            padding: '20px',
            background: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
            minHeight: '100vh',
            color: 'white',
        },
        eventCards: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
        },
        eventCard: {
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '15px',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
        },
        eventImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '10px',
        },
        eventTitle: {
            fontSize: '20px',
            margin: '10px 0',
            color: 'black',
        },
        eventDescription: {
            fontSize: '16px',
            color: 'black',
            flexGrow: 1,
        },
        eventDetails: {
            fontSize: '14px',
            color: 'black',
            marginBottom: '5px',
        },
        deleteButton: {
            backgroundColor: '#ff4d4d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            marginTop: '10px',
            alignSelf: 'center',
            width: '100%',
        },
        updateButton: {
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            cursor: 'pointer',
            marginTop: '10px',
            alignSelf: 'center',
            width: '100%',
        },
        updateForm: {
            display: selectedEvent ? 'block' : 'none',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px auto',
            width: '300px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        formInput: {
            marginBottom: '10px',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '100%',
        },
        formButton: {
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
            width: '100%',
        },
    };

    // Loading and error states
    if (loading) return (
        <div style={{...styles.eventList, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p>Loading events...</p>
        </div>
    );

    if (error) return (
        <div style={{...styles.eventList, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p>Error loading events: {error}</p>
        </div>
    );

    if (events.length === 0) return (
        <div style={{...styles.eventList, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <p>No events available</p>
        </div>
    );

    return (
        <>
            <div><AdminNavbar /></div>
            <div style={styles.eventList}>
                <h2>All Events</h2>
                <div style={styles.eventCards}>
                    {events.map((event) => (
                        <div style={styles.eventCard} key={event.id}>
                            <img
                                src={`http://localhost:8080${event.eventCoverPhoto}`}
                                alt={event.eventTitle}
                                style={styles.eventImage}
                            />
                            <h3 style={styles.eventTitle}>{event.eventTitle}</h3>
                            <p style={styles.eventDescription}>{event.eventDescription}</p>
                            
                            <div style={{marginTop: 'auto'}}> {/* This pushes the details and buttons to the bottom */}
                                <p style={styles.eventDetails}>
                                    <strong>Registration Starts:</strong> {formatDateTime(event.registrationStartingTime)}
                                </p>
                                <p style={styles.eventDetails}>
                                    <strong>Registration Ends:</strong> {formatDateTime(event.registrationEndingTime)}
                                </p>
                                <p style={styles.eventDetails}>
                                    <strong>Scheduled:</strong> {formatDateTime(event.eventScheduleTime)}
                                </p>
                                <p style={styles.eventDetails}>
                                    <strong>Limit:</strong> {event.eventLimit} participants
                                </p>

                                {/* <button
                                    style={styles.updateButton}
                                    onClick={() => {
                                        setSelectedEvent(event.id);
                                        setFormData({
                                            eventTitle: event.eventTitle,
                                            eventDescription: event.eventDescription,
                                            eventLimit: event.eventLimit,
                                            registrationStartingTime: event.registrationStartingTime,
                                            registrationEndingTime: event.registrationEndingTime,
                                            eventScheduleTime: event.eventScheduleTime,
                                        });
                                    }}
                                >
                                    Update Event
                                </button> */}

                                <button
                                    style={styles.deleteButton}
                                    onClick={() => handleDelete(event.id)}
                                >
                                    Delete Event
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Update Event Form */}
                {selectedEvent && (
                    <div style={styles.updateForm}>
                        <h3>Update Event</h3>
                        <input
                            type="text"
                            name="eventTitle"
                            placeholder="Event Title"
                            value={formData.eventTitle || ''}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                        <textarea
                            name="eventDescription"
                            placeholder="Event Description"
                            value={formData.eventDescription || ''}
                            onChange={handleInputChange}
                            style={{ ...styles.formInput, height: '100px' }}
                        />
                        <input
                            type="number"
                            name="eventLimit"
                            placeholder="Event Limit"
                            value={formData.eventLimit || ''}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                        <input
                            type="datetime-local"
                            name="registrationStartingTime"
                            value={formData.registrationStartingTime || ''}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                        <input
                            type="datetime-local"
                            name="registrationEndingTime"
                            value={formData.registrationEndingTime || ''}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                        <input
                            type="datetime-local"
                            name="eventScheduleTime"
                            value={formData.eventScheduleTime || ''}
                            onChange={handleInputChange}
                            style={styles.formInput}
                        />
                        <button
                            style={styles.formButton}
                            // onClick={() => handleUpdate(selectedEvent)}
                        >
                            Submit Update
                        </button>

                        <button
                            style={styles.formButton}
                            onClick={() => setSelectedEvent(null)} // Close the form
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
};

export default ViewEvent;