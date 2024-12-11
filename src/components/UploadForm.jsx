import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./UploadForm.css";

const UploadForm = () => {
  const [customId, setCustomId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateInput = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(customId)) {
      newErrors.customId = "Student ID must be exactly 10 digits.";
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Name can only contain letters and spaces.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs before submitting
    const inputErrors = validateInput();
    if (Object.keys(inputErrors).length > 0) {
      setErrors(inputErrors);
      return;
    }

    const studentData = { customId, name, email, password };

    try {
      const response = await axios.post("http://localhost:8080/students", studentData);
      toast.success("Student added successfully!");
      setErrors({});
      setCustomId('');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An error occurred while uploading the data.");
      }
    }
  };

  return (
    <div>
      <AdminNavbar />
      <div className="upload-form-container">
        <h2>Register New Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="customId">Student ID (10 digits)</label>
            <input
              type="text"
              id="customId"
              placeholder="Student ID"
              value={customId}
              onChange={(e) => setCustomId(e.target.value)}
              required
            />
            {errors.customId && <p className="error-message">{errors.customId}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password (min 6 chars)</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Toast container for toast messages */}
      <ToastContainer />
    </div>
  );
};

export default UploadForm;
