import Razorpay from "razorpay";
import crypto from "crypto";
import Booking from "../models/Booking.js";
import dotenv from "dotenv";

dotenv.config();

const resolveRazorpayKeys = () => {
    // First try known names
    let keyId =
        process.env.RAZORPAY_KEY_ID ||
        process.env.RAZORPAY_KEY ||
        process.env.RAZORPAY_ID ||
        process.env.RZP_KEY_ID ||
        process.env.RAZORPAY_API_KEY ||
        process.env.RAZORPAY_KEYID;

    let keySecret =
        process.env.RAZORPAY_KEY_SECRET ||
        process.env.RAZORPAY_SECRET ||
        process.env.RZP_KEY_SECRET ||
        process.env.RAZORPAY_API_SECRET ||
        process.env.RAZORPAY_SECRET_KEY;

    // If still missing, heuristically scan env keys containing 'RAZORPAY'
    if (!keyId || !keySecret) {
        const envKeys = Object.keys(process.env);
        const rpKeys = envKeys.filter(k => /RAZORPAY|RZP/i.test(k));

        if (!keyId) {
            const idCandidateName = rpKeys.find(k => /KEY|ID/i.test(k) && !/SECRET/i.test(k));
            if (idCandidateName) keyId = process.env[idCandidateName];
        }
        if (!keySecret) {
            const secretCandidateName = rpKeys.find(k => /SECRET/i.test(k));
            if (secretCandidateName) keySecret = process.env[secretCandidateName];
        }

        if (!keyId || !keySecret) {
            // Log which env var names we detected (not values)
            console.warn("Razorpay env scan:", {
                candidates: rpKeys,
                selectedKeyIdPresent: Boolean(keyId),
                selectedSecretPresent: Boolean(keySecret)
            });
        }
    }

    return { keyId, keySecret };
};

const getRazorpayInstance = () => {
    const { keyId, keySecret } = resolveRazorpayKeys();
    if (!keyId || !keySecret) {
        // Minimal debug to help diagnose env issues without leaking secrets
        console.warn("Razorpay env missing:", {
            has_KEY_ID: Boolean(keyId),
            has_KEY_SECRET: Boolean(keySecret)
        });
        throw new Error("RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET not configured in environment");
    }
    return new Razorpay({ key_id: keyId, key_secret: keySecret });
};

export const getPublicKey = async (req, res) => {
    try {
        const { keyId } = resolveRazorpayKeys();
        if (!keyId) {
            return res.status(500).json({ success: false, message: "Razorpay key not configured" });
        }
        return res.status(200).json({ success: true, key: keyId });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Failed to fetch key" });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR", receipt, notes } = req.body;
        if (!amount) {
            return res.status(400).json({ success: false, message: "amount is required (in paise)" });
        }

        const razorpay = getRazorpayInstance();
        const options = {
            amount: Math.floor(Number(amount)), // amount in paise
            currency,
            receipt: receipt || `rcpt_${Date.now()}`,
            notes: notes || {}
        };

        const order = await razorpay.orders.create(options);
        return res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({ success: false, message: "Failed to create order" });
    }
};

export const verifyPaymentAndCreateBooking = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            booking
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification details are missing" });
        }

        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const { keySecret } = resolveRazorpayKeys();
        const expectedSignature = crypto
            .createHmac("sha256", keySecret)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;
        if (!isAuthentic) {
            return res.status(400).json({ success: false, message: "Invalid payment signature" });
        }

        // Create booking on successful payment
        const bookingPayload = {
            ...booking,
            amount: booking?.amount,
            currency: booking?.currency || "INR",
            status: "paid",
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature
        };

        const newBooking = new Booking(bookingPayload);
        const savedBooking = await newBooking.save();

        return res.status(200).json({ success: true, message: "Payment verified and booking created", data: savedBooking });
    } catch (error) {
        console.error("Error verifying payment / creating booking:", error);
        return res.status(500).json({ success: false, message: "Failed to verify payment" });
    }
};



