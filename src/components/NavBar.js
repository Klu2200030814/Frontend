import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>Student Dashboard</h2>
            <ul style={styles.navLinks}>
                <li>
                    <Link to="/user-dashboard" style={styles.link}>Register Event</Link>
                </li>
                <li>
                    <Link to="/my-events" style={styles.link}>My Events</Link> {/* My Events link */}
                </li>
                <li>
                    <Link to="/student-login" style={styles.logoutButton}>Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

// Styles for Navbar
const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#2a9d8f',
        color: '#fff',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
    logo: {
        margin: 0,
        fontSize: '24px',
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
        fontWeight: '500',
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

export default Navbar;
