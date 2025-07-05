import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom'; 
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider'); // Default role

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/signup', {
        username,
        password,
        role,
      });
      alert(res.data.msg);
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-header">Create Account</div>
      <div className="partition"></div>
      <form className="form" onSubmit={handleSignup}>
        <div>
          <input
            className="user-inp"
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            className="pass-inp"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="role-selector">
          <label>
            <input
              type="radio"
              name="role"
              value="rider"
              checked={role === 'rider'}
              onChange={() => setRole('rider')}
            />
            Rider
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              name="role"
              value="driver"
              checked={role === 'driver'}
              onChange={() => setRole('driver')}
            />
            Driver
          </label>
        </div>

        <div>
          <button className="sub-button">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
