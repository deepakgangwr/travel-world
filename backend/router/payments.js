import express from 'express';
import { createOrder, verifyPaymentAndCreateBooking, getPublicKey } from '../controllers/paymentController.js';

const paymentsRoute = express.Router();

// Create a Razorpay order
paymentsRoute.post('/orders', createOrder);

// Verify payment signature and create booking
paymentsRoute.post('/verify', verifyPaymentAndCreateBooking);

// Return public key to frontend
paymentsRoute.get('/key', getPublicKey);

export default paymentsRoute;



