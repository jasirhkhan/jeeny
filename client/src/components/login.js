import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
  
      localStorage.setItem('token', res.data.token); // store token
    //   alert('Login successful');
      navigate('/dashboard'); 
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed');
    }
  };
  

  return (
    <div className="login-page">
      <div className="login-header">Management <span className="lib-name">System</span></div>
      <div className="partition"></div>
      <form className="form" onSubmit={handleLogin}>
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
          <button className="sub-button">Login</button>
        </div>
      </form>

      <div className="question">
        Don't have an account?
        <button
          onClick={() => navigate('/signup')}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
            marginLeft: '5px',
            textDecoration: 'underline'
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Login;
