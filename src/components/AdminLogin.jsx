import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/admin/login", null, {
        params: { username, password },
      });
      if (response.status === 200) {
        const authToken = response.data;
        Cookies.set('authToken', authToken);
        toast.success("Login successful! Redirecting to dashboard..."); // Success toast
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Invalid username or password");
      toast.error("Invalid username or password"); // Error toast
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url("/Student.webp")', // Add your background image here
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
    },
    form: {
      position: 'relative',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background for the form
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    heading: {
      color: '#333',
      fontSize: '24px',
      marginBottom: '10px',
      fontWeight: '600',
    },
    subtitle: {
      color: '#666',
      fontSize: '14px',
      marginBottom: '20px',
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left',
      position: 'relative',
    },
    label: {
      display: 'block',
      color: '#333',
      marginBottom: '5px',
      fontSize: '14px',
      fontWeight: '500',
    },
    inputWrapper: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      paddingLeft: '40px', // Space for the icon
      border: '1px solid #ccc',
      borderRadius: '8px',
      color: '#333',
      fontSize: '16px',
      transition: 'border-color 0.3s',
      outline: 'none',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: '#4f46e5',
    },
    icon: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '20px',
      height: '20px',
      color: '#666',
    },
    button: {
      width: '100%',
      padding: '12px',
      border: 'none',
      backgroundColor: '#4f46e5',
      color: 'white',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '12px',
    },
    buttonHover: {
      backgroundColor: '#4338ca',
    },
    errorMessage: {
      backgroundColor: 'rgba(220, 38, 38, 0.2)',
      color: '#f87171',
      padding: '10px',
      borderRadius: '8px',
      marginTop: '16px',
      fontSize: '14px',
      border: '1px solid rgba(220, 38, 38, 0.3)',
    },
  };

  const UserIcon = () => (
    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const LockIcon = () => (
    <svg style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const ErrorIcon = () => (
    <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12" y2="16" />
    </svg>
  );

  return (
    <div style={styles.container}>
      <div style={styles.overlay} />
      <form style={styles.form} onSubmit={handleLogin}>
        <div style={styles.formContent}>
          <h2 style={styles.heading}>Admin Login</h2>
          <p style={styles.subtitle}>Enter your credentials to access the dashboard</p>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <div style={styles.inputWrapper}>
              <UserIcon />
              <input
                type="text"
                style={styles.input}
                value={username}
                onChange={(e) => {
                  const input = e.target.value;
                  // Allow only alphabetic characters (letters and spaces if needed)
                  if (/^[a-zA-Z\s]*$/.test(input)) {
                    setUsername(input);
                    setError(''); // Clear error if the input is valid
                  } else {
                    setError("Username can only contain letters and spaces");
                  }
                }}
                placeholder="Enter your name"
                onFocus={(e) => {
                  Object.assign(e.target.style, styles.inputFocus);
                  e.target.previousSibling.style.color = '#4f46e5';
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, styles.input);
                  e.target.previousSibling.style.color = '#94a3b8';
                }}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputWrapper}>
              <LockIcon />
              <input
                type="password"
                style={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                onFocus={(e) => {
                  Object.assign(e.target.style, styles.inputFocus);
                  e.target.previousSibling.style.color = '#4f46e5';
                }}
                onBlur={(e) => {
                  Object.assign(e.target.style, styles.input);
                  e.target.previousSibling.style.color = '#94a3b8';
                }}
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isLoading ? styles.buttonLoading : {}),
            }}
            onMouseOver={(e) => !isLoading && Object.assign(e.target.style, { ...styles.button, ...styles.buttonHover })}
            onMouseOut={(e) => !isLoading && Object.assign(e.target.style, styles.button)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span style={styles.loadingSpinner} />
                Logging in...
              </>
            ) : 'Login'}
          </button>

          {error && (
            <div style={styles.errorMessage}>
              <ErrorIcon />
              {error}
            </div>
          )}
        </div>
      </form>

      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default AdminLogin;
