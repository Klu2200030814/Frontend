import React from 'react';
import AdminNavbar from './AdminNavbar'; // Import the AdminNavbar component
import './AdminDashboard.css'; // Import the CSS for the dashboard

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <AdminNavbar /> {/* Use the AdminNavbar component here */}
      <div className="content">
        {/* Other content goes here */}
      </div>
    </div>
  );
};

export default AdminDashboard;