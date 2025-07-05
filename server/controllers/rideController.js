import Ride from '../models/ride.js';
import User from '../models/user.js';

export const requestRide = async (req, res) => {
  const { pickupLocation, dropoffLocation, rideType } = req.body;
  try {
    const newRide = new Ride({
      passenger: req.body.passengerId,
      pickupLocation,
      dropoffLocation,
      rideType
    });

    await newRide.save();
    res.status(201).json({ msg: 'Ride requested', ride: newRide });
  } catch {
    res.status(500).json({ msg: 'Error requesting ride' });
  }
};

export const getRideStatus = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driver', 'username');
    res.json(ride);
  } catch {
    res.status(404).json({ msg: 'Ride not found' });
  }
};

export const getRideHistory = async (req, res) => {
  try {
    const rides = await Ride.find({ passenger: req.params.userId });
    res.json(rides);
  } catch {
    res.status(500).json({ msg: 'Error fetching history' });
  }
};

export const getPendingRides = async (req, res) => {
  try {
    const driver = await User.findById(req.headers.driverid);
    if (driver.role !== 'driver') return res.status(403).json({ msg: 'Not a driver' });
    const rides = await Ride.find({ status: 'Requested' });
    res.json(rides);
  } catch {
    res.status(500).json({ msg: 'Error fetching pending rides' });
  }
};

export const acceptRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ msg: 'Ride not found' });

    if (ride.status !== 'Requested') {
      return res.status(400).json({ msg: 'Ride already taken' });
    }

    ride.driver = req.headers.driverid
    ride.status = 'Accepted';
    await ride.save();

    res.json({ msg: 'Ride accepted', ride });
    
  } catch {
    res.status(500).json({ msg: 'Error accepting ride' });
  }
};

export const updateRideStatus = async (req, res) => {
  const { status } = req.body;
  try {

    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ msg: 'Ride not found' });
    ride.status = status;
    console.log(ride)
    await ride.save();

    res.json({ msg: 'Status updated', ride });

  } catch {
    res.status(500).json({ msg: 'Error updating status' });

  }
};

export const getActiveRide = async (req, res) => {
  try {
    const driverId = req.params.driverId;

    const ride = await Ride.findOne({
      driver: driverId,
      status: { $in: ['Accepted', 'InProgress'] }
    }).populate('passenger', 'username');

    if (!ride) return res.status(404).json({ msg: 'No active ride found' });

    res.json(ride);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching active ride' });
  }
};

export const getCompletedRides = async (req, res) => {
  const { driverId } = req.params;

  try {
    const rides = await Ride.find({
      driver: driverId,
      status: 'Completed',
    }).populate('passenger', 'username');

    res.status(200).json(rides);
  } catch (err) {
    console.error('Error fetching completed rides:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
