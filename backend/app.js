import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

// CORS configuration
app.use(
    cors({
        origin: "*", // Allow requests from any origin (replace with process.env.FRONTEND_URL for specific origin)
        methods: ["POST"], // Allow POST requests
        credentials: true, // Allow sending cookies
    })
);

// Middleware to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for handling reservations
app.use("/api/v1/reservation", reservationRouter);

// Connect to the database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
