import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Assuming you're using CSS for styles

function Home() {
    return (
        <div className="home-container">
            <div className="title-container">
                <h1 className="centered-title">Student Extra Curricular Activities Portal</h1>
            </div>
            <div className="button-container">
                <Link 
                    to="/student-login" 
                    className="button"
                    aria-label="Student Login"
                >
                    Student Login
                </Link>
                <Link 
                    to="/admin" 
                    className="button"
                    aria-label="Admin Login"
                >
                    Admin Login
                </Link>
            </div>
        </div>
    );
}

export default Home;