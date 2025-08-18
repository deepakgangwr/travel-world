import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./router/auth.js";
import tourRoute from "./router/tours.js";
import userRoute from "./router/users.js";
import reviewRoute from "./router/review.js";
import bookingRoute from "./router/bookings.js";
import searchRoute from "./router/Search.js";
import contactRoute from "./router/contacts.js";
import blogRoute from "./router/blogs.js";
import commentRoute from "./router/comments.js";
import paymentsRoute from "./router/payments.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true,
}


app.get('/', (req, res) => {
    res.send('Hello, world!');
});




mongoose.set("strictQuery", false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL); // No need for options
        console.log("MongoDB database connected");
    } catch (err) {
        console.error("MongoDB database connection failed:", err);
    }
};


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/search", searchRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/blogs", blogRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/payments", paymentsRoute);

app.listen(port, () => {
    connect();
    console.log("Server is listening on port", port);
});