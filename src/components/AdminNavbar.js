import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { PersonAdd, People, Event, EventNote, Logout } from '@mui/icons-material';
import './AdminNavbar.css';
import Cookies from 'js-cookie';

const AdminNavbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      navigate('/'); // Redirect to home if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the auth token cookie
    Cookies.remove('authToken');
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <nav className="navbar">
      {/* Clickable title for navigating back to the dashboard */}
      <Link to="/dashboard" className="navbar-title">
        <h2>Admin Dashboard</h2>
      </Link>
      <div className="button-group">
        <Button
          variant="contained"
          component={Link}
          to="/view-students"
          className="nav-button"
          startIcon={<People />}
        >
          View Students
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/upload"
          className="nav-button"
          startIcon={<PersonAdd />}
        >
          Add Student
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/ViewEvent"
          className="nav-button"
          startIcon={<EventNote />}
        >
          View Events
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/createEvent"
          className="nav-button"
          startIcon={<Event />}
        >
          Add Event
        </Button>
        <Button
          variant="contained"
          onClick={handleLogout}
          className="nav-button logout-button"
          startIcon={<Logout />}
        >
          Logout
        </Button>

      </div>
    </nav>
  );
};

export default AdminNavbar;