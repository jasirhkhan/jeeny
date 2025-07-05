import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/signup', {
        username,
        password
      });
      alert(res.data.msg);
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
        <div>
          <button className="sub-button">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
