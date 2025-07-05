import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    try {
      const res = await axios.get('http://localhost:3000/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(res.data.user);
    } catch (err) {
      console.error(err);
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const renderRiderDashboard = () => (
    <>
      <h1>Welcome, {user.username}!</h1>
      <p>Where would you like to go today?</p>

      <div className="dashboard-actions">
        <button className="action-btn">Book a Ride</button>
        <button className="action-btn">Your Rides</button>
        <button className="action-btn">Profile</button>
      </div>
    </>
  );

  const renderDriverDashboard = () => (
    <>
      <h1>Hello, Driver {user.username}!</h1>
      <p>Ready to pick up some riders?</p>

      <div className="dashboard-actions">
        <button className="action-btn">View Ride Requests</button>
        <button className="action-btn">Your Completed Rides</button>
        <button className="action-btn">Driver Profile</button>
      </div>
    </>
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="logo">Jeeny<span className="dot">.</span></div>
        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-main">
        {user ? (
          user.role === 'driver' ? renderDriverDashboard() : renderRiderDashboard()
        ) : (
          <p>Loading user data...</p>
        )}
      </main>

      <footer className="dashboard-footer">
        <p>&copy; 2025 Jeeny. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
