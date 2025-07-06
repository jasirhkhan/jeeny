import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

const YourRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        // Get user info first to get user ID
        const userRes = await axios.get('http://localhost:3000/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = userRes.data.user._id;

        // Fetch ride history for that user
        const ridesRes = await axios.get(`http://localhost:3000/rides/history/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort rides from latest to oldest based on creation date
        const sorted = ridesRes.data.sort((a, b) => new Date(b.requestedAt) - new Date(a.requestedAt));
        setRides(sorted);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch rides', err);
        navigate('/');
      }
    };

    fetchRides();
  }, [navigate]);

  return (
    <div className="page-container">

    <div className="your-rides-container form-card">
      <h2>Your Ride History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : rides.length === 0 ? (
        <p>You haven't booked any rides yet.</p>
      ) : (
        <ul>
          {rides.map((ride) => (
            <li key={ride._id} className="list-card">
              <strong>{ride.rideType}</strong> ride from <em>{ride.pickupLocation}</em> to <em>{ride.dropoffLocation}</em><br />
              Status: {ride.status} <br />
              Date: {new Date(ride.requestedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
      <button className="primary-btn" onClick={() => navigate('/dashboard')} style={{ marginTop: '1rem' }}>Back to Dashboard</button>
    </div>
    </div>

  );
};

export default YourRides;
