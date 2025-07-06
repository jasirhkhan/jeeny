import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css'; // This is the primary stylesheet for the form's look
// import '../styles/pages.css'; // Keep this only if it provides essential global page layout that isn't conflicting.
                               // If it's causing issues, temporarily comment it out for testing.

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'rider', // Default role
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error message when user starts typing/changing input
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error before new submission
    try {
      const res = await axios.post('http://localhost:3000/signup', formData);
      alert(res.data.msg || 'Account created successfully! Please log in.'); // More descriptive alert
      navigate('/'); // Redirect to login page
    } catch (err) {
      console.error('Signup failed:', err);
      // Display backend error message or a generic one
      setError(err.response?.data?.message || 'Signup failed. Please check your details.');
    }
  };

  return (
    // Use the same container class as login.js to get its centering and card styles
    <div className="login-container">
      {/* Consistent branding logo */}
      <div className="login-logo">Jeeny<span className="dot">.</span></div>
      <h2>Create Your Account</h2> {/* Slightly more welcoming heading */}

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username" // Crucial for handleChange
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your desired username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password" // Crucial for handleChange
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
          />
        </div>

        <div className="form-group"> {/* Wrap role selection for consistent vertical spacing */}
          <label>I am a:</label>
          <div className="role-selector">
            <label htmlFor="role-rider">
              <input
                type="radio"
                id="role-rider"
                name="role"
                value="rider"
                checked={formData.role === 'rider'}
                onChange={handleChange}
              />
              Rider
            </label>
            <label htmlFor="role-driver">
              <input
                type="radio"
                id="role-driver"
                name="role"
                value="driver"
                checked={formData.role === 'driver'}
                onChange={handleChange}
              />
              Driver
            </label>
          </div>
        </div>

        {/* Error message display */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-btn">Sign Up</button>
      </form>

      <p className="register-link"> {/* Reusing this class for general navigation links below form */}
        Already have an account? <Link to="/">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;