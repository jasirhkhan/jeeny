import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/pages.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const res = await axios.get('http://localhost:3000/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        navigate('/');
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="page-container">
      <div className="form-card" style={{ textAlign: 'center' }}>
        <h2>Your Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <button className="primary-btn" onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem' }}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Profile;
