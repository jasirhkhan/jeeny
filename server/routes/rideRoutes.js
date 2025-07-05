import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {getCompletedRides, getActiveRide, requestRide, getRideStatus,getRideHistory, getPendingRides,acceptRide, updateRideStatus} from '../controllers/rideController.js';

const router = express.Router();

router.post('/request', authMiddleware, requestRide);
router.get('/status/:id', authMiddleware, getRideStatus);
router.get('/history/:userId', authMiddleware, getRideHistory);

router.get('/pending', authMiddleware, getPendingRides);
router.post('/accept/:rideId', authMiddleware, acceptRide);
router.post('/update-status/:rideId', authMiddleware, updateRideStatus);
router.get('/active/:driverId', authMiddleware,getActiveRide); 
router.get('/completed/:driverId', authMiddleware,getCompletedRides);

export default router;
