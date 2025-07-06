import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/pages.css';


const DriverCompletedRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedRides = async () => {
    const token = localStorage.getItem('token');
    try {
      const userRes = await axios.get('http://localhost:3000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const driverId = userRes.data.user._id;
      const res = await axios.get(`http://localhost:3000/rides/completed/${driverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRides(res.data);
    } catch (err) {
      console.error('Error fetching completed rides', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedRides();
  }, []);

  if (loading) return <p>Loading your completed rides...</p>;

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>Your Completed Rides</h2>
        {rides.length === 0 ? (
          <p>No completed rides yet.</p>
        ) : (
          <ul className="ride-list">
            {rides.map((ride) => (
              <li key={ride._id} className="list-card">
                <p><strong>From:</strong> {ride.pickupLocation}</p>
                <p><strong>To:</strong> {ride.dropoffLocation}</p>
                <p><strong>Passenger:</strong> {ride.passenger?.username || 'N/A'}</p>
                <p><strong>Requested At:</strong> {new Date(ride.requestedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DriverCompletedRides;
