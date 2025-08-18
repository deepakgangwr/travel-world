import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String
    },
    tourName: {
        type: String,
        required:true,
    },
    fullName: {
      type: String,
      required: true,
    },
    groupSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    bookAt: {
      type: Date,
      required: true,
    },
    image:{
      type:String,
    },
    // Payment fields
    amount: {
      type: Number, // amount in paise
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String, // created | paid | failed | refunded
      default: "created",
    },
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);