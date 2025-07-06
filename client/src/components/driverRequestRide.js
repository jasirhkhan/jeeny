import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

const DriverRequestRide = () => {
  const [rides, setRides] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('http://localhost:3000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUserId = res.data.user._id;
        setUserId(fetchedUserId);

        // Try fetching current active ride first
        fetchActiveRide(fetchedUserId);
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };

    fetchUser();
  }, []);

  const fetchPendingRides = async (driverId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:3000/rides/pending', {
        headers: {
          Authorization: `Bearer ${token}`,
          driverid: driverId,
        },
      });
      setRides(res.data);
    } catch (err) {
      console.error('Error fetching pending rides', err);
    }
  };

  const fetchActiveRide = async (driverId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:3000/rides/active/${driverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActiveRide(res.data);
    } catch (err) {
      fetchPendingRides(driverId);
    }
  };

  const handleAccept = async (rideId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(`http://localhost:3000/rides/accept/${rideId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          driverid: userId,
        },
      });
      setActiveRide(res.data.ride);
    } catch (err) {
      console.error('Error accepting ride:', err);
    }
  };

  const updateRideStatus = async (status) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        `http://localhost:3000/rides/update-status/${activeRide._id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            driverid: userId,
          },
        }
      );
      console.log("status")

      if (status === 'Cancelled' || status === 'Completed') {
        setActiveRide(null);
        fetchPendingRides(userId);
      } else {
        setActiveRide(res.data.ride);
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div className="page-container">
      <h2>Driver Dashboard</h2>

      {activeRide ? (
        <div className="form-card" style={{ border: '2px solid #007bff' }}>
          <h3>Active Ride</h3>
          <p><strong>Ride Type:</strong> {activeRide.rideType}</p>
          <p><strong>From:</strong> {activeRide.pickupLocation}</p>
          <p><strong>To:</strong> {activeRide.dropoffLocation}</p>
          <p><strong>Status:</strong> {activeRide.status}</p>
          {activeRide.passenger?.username && (
            <p><strong>Passenger:</strong> {activeRide.passenger.username}</p>
          )}
          {activeRide.createdAt && (
            <p><strong>Requested At:</strong> {new Date(activeRide.createdAt).toLocaleString()}</p>
          )}

          {activeRide.status === 'Accepted' && (
            <>
              <button className="primary-btn" onClick={() => updateRideStatus('In Progress')} style={{ marginRight: '1rem' }}>
                Start Ride
              </button>
              <button className="primary-btn" onClick={() => updateRideStatus('Cancelled')} style={{ backgroundColor: '#dc3545', color: 'white' }}>
                Cancel Ride
              </button>
            </>
          )}

          {activeRide.status === 'In Progress' && (
            <button className="primary-btn" onClick={() => updateRideStatus('Completed')} style={{ backgroundColor: 'green', color: 'white' }}>
              End Ride
            </button>
          )}
        </div>
      ) : (
        <div className="driver-ride-requests form-card">
          <h3>Pending Ride Requests</h3>
          {rides.length === 0 ? (
            <p>No pending rides at the moment.</p>
          ) : (
            <ul>
              {rides.map((ride) => (
                <li key={ride._id} className="list-card">
                  <p><strong>Ride Type:</strong> {ride.rideType}</p>
                  <p><strong>From:</strong> {ride.pickupLocation}</p>
                  <p><strong>To:</strong> {ride.dropoffLocation}</p>
                  {ride.passenger?.username && (
                    <p><strong>Passenger:</strong> {ride.passenger.username}</p>
                  )}
                  <button className="primary-btn" onClick={() => handleAccept(ride._id)}>Accept Ride</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverRequestRide;
