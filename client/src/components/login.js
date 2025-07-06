import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css'; // Make sure this path is correct

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); // Navigate to dashboard on successful login
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    }
  };

  return (
    // This is the key: Ensure the top-level div has the class "login-container"
    <div className="login-container">
      {/* Use the "login-logo" class for consistent branding */}
      <div className="login-logo">Jeeny<span className="dot">.</span></div>
      <h2>Log In</h2> {/* Use standard H2 for consistent heading style */}
      <form onSubmit={handleSubmit}>
        {/* Wrap each input in a "form-group" for consistent spacing and label alignment */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username" // Important for `handleChange`
            value={username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password" // Important for `handleChange`
            value={password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        {/* Display error messages using the "error-message" class */}
        {error && <p className="error-message">{error}</p>}
        {/* Use the "login-btn" class for consistent button styling */}
        <button type="submit" className="login-btn">Log In</button>
      </form>
      {/* Use the "register-link" class for consistent navigation link styling */}
      <p className="register-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;