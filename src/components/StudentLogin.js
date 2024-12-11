import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Cookies from 'js-cookie';
function StudentLogin() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const response = await login(credentials);
            if (response.status === 200) {
                const authToken = response.data;
                Cookies.set('authToken', authToken);
                navigate('/user-dashboard');
            }
        } catch (error) {
            setError("Invalid username or password");
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
            backgroundImage: 'url("/Student.webp")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        form: {
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
            marginBottom: '20px',
            fontWeight: '600',
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
            marginBottom: '15px',
        },
        input: {
            width: '100%',
            padding: '12px 16px',
            paddingLeft: '40px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            color: '#333',
            fontSize: '16px',
            transition: 'border-color 0.3s',
            outline: 'none',
            boxSizing: 'border-box',
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
            color: 'red',
            backgroundColor: '#ffe5e5',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
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


    return (
        <div style={styles.container}>
            <div style={styles.overlay}></div>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.heading}>Student Login</h2>
                {error && <div style={styles.errorMessage}>{error}</div>}

                <div style={styles.inputGroup}>
                    <div style={styles.inputWrapper}>
                        <UserIcon />
                        <input
                            type="email"
                            value={credentials.email}
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                </div>

                <div style={styles.inputGroup}>
                    <div style={styles.inputWrapper}>
                        <LockIcon />
                        <input
                            type="password"
                            value={credentials.password}
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default StudentLogin;
