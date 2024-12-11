import axios from 'axios';

// Base API instance with common settings
const api = axios.create({
    baseURL: 'http://localhost:8080', // Update with your API base URL if different
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function for handling API errors
const handleApiError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        throw new Error(error.response.data.message || 'An error occurred');
    } else {
        console.error('API Error:', error.message);
        throw new Error('Network error: ' + error.message);
    }
};

// Login function
export const login = async (loginData) => {
    try {
        const response = await api.post('/students/login', loginData);
        return response;
    } catch (error) {
        handleApiError(error);
    }
};


// Function to create an event
export const createEvent = async (formData) => {
    try {
        const response = await api.post('/events/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Use multipart for file uploads
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};

// Function to get all events
export const getAllEvents = async () => {
    try {
        const response = await api.get('/events/all');
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Function to delete an event by its ID
export const deleteEvent = async (eventId) => {
    try {
        const response = await api.delete(`/events/${eventId}`);
        return response.data;
    } catch (error) {
        handleApiError(error);
    }
};

// Function to register for a specific event
export const registerForEvent = async (eventId, userId) => {
    try {
        const response = await api.post(`/register/${eventId}`, { userId });
        return response.data;
    } catch (error) {
        console.error('Error registering for event:', error);
        throw error;
    }
};
// Update Event API function
export const updateEvent = async (eventData) => {
    try {
        const { eventId, ...data } = eventData; // Destructure to get eventId and the rest of the data
        const response = await axios.put(`/events/${eventId}`, data);
        return response.data; // Assuming the updated event is returned
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};




export default api;
