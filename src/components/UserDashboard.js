import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import Cookies from 'js-cookie';
import StudentViewEvent from './StudentViewEvent';

const UserDashboard = () => {
    const navigate = useNavigate(); // Initialize navigate function

    return (
        <div>
            {/* Navbar Section */}
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>Student Dashboard</h2>
                <ul style={styles.navLinks}>
                    <li>
                        <Link to="/user-dashboard" style={styles.link}>Register Event</Link>
                    </li>
                    <li>
                        <Link to="/my-events" style={styles.link}>My Events</Link> {/* Added My Events link */}
                    </li>
                    <li>
                        <Link to="/student-login" style={styles.logoutButton}>Logout</Link>
                    </li>
                </ul>
            </nav>

            {/* Dashboard Section */}
            <StudentViewEvent />
        </div>
    );
};

// Styles for Navbar and Dashboard
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#2a9d8f',
        color: '#fff',
    },
    logo: {
        margin: 0,
    },
    navLinks: {
        listStyle: 'none',
        display: 'flex',
        gap: '2rem',
        margin: 0,
        padding: 0,
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
    },
    logoutButton: {
        backgroundColor: '#e63946', 
        color: '#fff',
        border: 'none',
        padding: '0.5rem 1rem',
        cursor: 'pointer',
        borderRadius: '5px',
        fontSize: '1rem',
    },
};

export default UserDashboard;
