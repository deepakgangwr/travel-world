import express from 'express';
import { createBooking, getAllBookings, getBooking, getUserBookings } from '../controllers/bookingController.js';
import { verifyAdmin } from '../utils/verifyToken.js';
import verifyToken from '../utils/verifyToken.js';

const bookingRoute = express.Router();

// Create a new review for a tour
bookingRoute.post('/', createBooking);

bookingRoute.get('/:id', getBooking);

bookingRoute.post('/',verifyAdmin, getAllBookings);

// Route to get bookings for the current user
bookingRoute.get('/user/me', verifyToken, getUserBookings);

export default bookingRoute
