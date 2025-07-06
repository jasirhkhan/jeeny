import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
const RequestRide = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [rideType, setRideType] = useState('Car');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:3000/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(res.data.user._id); 
      } catch (err) {
        console.error('Failed to fetch user ID', err);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:3000/rides/request', {
        passengerId: userId,
        pickupLocation: pickup,
        dropoffLocation: dropoff,
        rideType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Ride requested successfully!');
      navigate('/dashboard')
    } catch (err) {
      console.error(err);
      alert('Failed to request ride');
    }
  };

  return (
    <div className="page-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Request a Ride</h2>
        <label>Pickup Location</label>
        <input onChange={(e) => setPickup(e.target.value)} />

        <label>Drop-off Location</label>
        <input onChange={(e) => setDropoff(e.target.value)} />

        <label>Ride Type</label>
        <select onChange={(e) => setRideType(e.target.value)} value={rideType}>
          <option>Car</option>
          <option>Bike</option>
          <option>Rickshaw</option>
        </select>

        <button className="primary-btn" type="submit" disabled={!userId} style={{ marginTop: '1rem' }}>
          Request
        </button>
      </form>
    </div>
  );
};

export default RequestRide;
