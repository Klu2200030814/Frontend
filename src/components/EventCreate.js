import React, { useState } from 'react';
import { createEvent } from '../services/api';
import { TextField, Button, Box, Typography, Container, Paper, FormControl, FormLabel } from '@mui/material';
import AdminNavbar from './AdminNavbar';
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify and ToastContainer
import 'react-toastify/dist/ReactToastify.css';

const EventCreate = () => {
    const [newEvent, setNewEvent] = useState({
        eventTitle: '',
        eventDescription: '',
        registrationStartingTime: '',
        registrationEndingTime: '',
        eventScheduleTime: '',
        limit: 0,
        eventCoverPhoto: null
    });

    const [successMessage, setSuccessMessage] = useState('');  // State for success message

    const handleFileChange = (e) => {
        setNewEvent({ ...newEvent, eventCoverPhoto: e.target.files[0] });
    };

    const handleEventSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('eventTitle', newEvent.eventTitle);
        formData.append('eventDescription', newEvent.eventDescription);
        formData.append('registrationStartingTime', newEvent.registrationStartingTime);
        formData.append('registrationEndingTime', newEvent.registrationEndingTime);
        formData.append('eventScheduleTime', newEvent.eventScheduleTime);
        formData.append('limit', newEvent.limit);
        formData.append('eventCoverPhoto', newEvent.eventCoverPhoto);

        try {
            await createEvent(formData);
            toast.success("Event Added Successfully!") // Show success message
            // Clear the form fields after successful submission
            setNewEvent({
                eventTitle: '',
                eventDescription: '',
                registrationStartingTime: '',
                registrationEndingTime: '',
                eventScheduleTime: '',
                limit: 0,
                eventCoverPhoto: null
            });
        } catch (error) {
            toast.error("Invaild or Can't Create Event")
        }
    };

    return (
        <div style={{
            background: 'linear-gradient(135deg, #2c3e50, #4ca1af)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <AdminNavbar />
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Paper elevation={8} sx={{
                    backgroundColor: '#ffffff',
                    padding: 3,
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    width: '100%'
                }}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ textShadow: '0 0 8px white, 0 0 15px white' }}>
                        Create a New Event
                    </Typography>

                    {successMessage && (
                        <Typography variant="h6" color="success.main" align="center" gutterBottom>
                            {successMessage}
                        </Typography>
                    )}

                    <form onSubmit={handleEventSubmit} encType="multipart/form-data">
                        <Box mb={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: 'black' }}>Event Title</FormLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={newEvent.eventTitle}
                                    onChange={(e) => setNewEvent({ ...newEvent, eventTitle: e.target.value })}
                                    required
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    InputProps={{ style: { color: 'black' } }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderColor: 'rgba(0, 0, 0, 0.5)',
                                            boxShadow: '0 0 8px black'
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box mb={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: 'black' }}>Event Description</FormLabel>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    value={newEvent.eventDescription}
                                    onChange={(e) => setNewEvent({ ...newEvent, eventDescription: e.target.value })}
                                    required
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    InputProps={{ style: { color: 'black' } }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderColor: 'rgba(0, 0, 0, 0.5)',
                                            boxShadow: '0 0 8px black'
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box mb={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: 'black' }}>Registration Starting Time</FormLabel>
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    InputLabelProps={{ shrink: true, style: { color: 'black' } }}
                                    variant="outlined"
                                    value={newEvent.registrationStartingTime}
                                    onChange={(e) => setNewEvent({ ...newEvent, registrationStartingTime: e.target.value })}
                                    required
                                    InputProps={{ style: { color: 'black' } }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderColor: 'rgba(0, 0, 0, 0.5)',
                                            boxShadow: '0 0 8px black'
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box mb={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: 'black' }}>Registration Ending Time</FormLabel>
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    InputLabelProps={{ shrink: true, style: { color: 'black' } }}
                                    variant="outlined"
                                    value={newEvent.registrationEndingTime}
                                    onChange={(e) => setNewEvent({ ...newEvent, registrationEndingTime: e.target.value })}
                                    required
                                    InputProps={{ style: { color: 'black' } }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderColor: 'rgba(0, 0, 0, 0.5)',
                                            boxShadow: '0 0 8px black'
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box mb={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: 'black' }}>Event Schedule Time</FormLabel>
                                <TextField
                                    fullWidth
                                    type="datetime-local"
                                    InputLabelProps={{ shrink: true, style: { color: 'black' } }}
                                    variant="outlined"
                                    value={newEvent.eventScheduleTime}
                                    onChange={(e) => setNewEvent({ ...newEvent, eventScheduleTime: e.target.value })}
                                    required
                                    InputProps={{ style: { color: 'black' } }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderColor: 'rgba(0, 0, 0, 0.5)',
                                            boxShadow: '0 0 8px black'
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box mb={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: 'black' }}>Limit</FormLabel>
                                <TextField
                                    fullWidth
                                    type="number"
                                    variant="outlined"
                                    value={newEvent.limit}
                                    onChange={(e) => setNewEvent({ ...newEvent, limit: e.target.value })}
                                    required
                                    InputLabelProps={{ style: { color: 'black' } }}
                                    InputProps={{ style: { color: 'black' } }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderColor: 'rgba(0, 0, 0, 0.5)',
                                            boxShadow: '0 0 8px black'
                                        }
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box mb={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ color: 'black' }}>Event Cover Photo</FormLabel>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        border: '1px solid rgba(0, 0, 0, 0.5)',
                                        borderRadius: '5px',
                                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                        color: 'black',
                                        outline: 'none',
                                        boxShadow: '0 0 8px black'
                                    }}
                                />
                            </FormControl>
                        </Box>

                        <Box mb={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{
                                    backgroundColor: '#4caf50',
                                    color: 'white',
                                    borderRadius: '5px',
                                    '&:hover': { backgroundColor: '#45a049' },
                                    boxShadow: '0 0 10px black'
                                }}
                            >
                                Create Event
                            </Button>
                        </Box>
                    </form>
                </Paper>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default EventCreate;
