import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.routes.js';
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';

dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

// Middleware setup
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies attached to the client request

// Route definitions
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing',listingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.status || 500; // Use 'err.status' instead of 'err.statusCode'
    const message = err.message || 'Internal server error'; // Fixed typo here
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
    });
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
