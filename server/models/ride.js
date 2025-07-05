import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: { type: String, required: true },
  dropoffLocation: { type: String, required: true },
  rideType: { type: String, enum: ['Bike', 'Car', 'Rickshaw'], required: true },
  status: { 
    type: String, 
    enum: ['Requested', 'Accepted', 'In Progress', 'Completed', 'Cancelled'], 
    default: 'Requested' 
  },
  requestedAt: { type: Date, default: Date.now }
});

const Ride = mongoose.model('Ride', rideSchema);

export default Ride;
