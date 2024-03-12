import { ErrorHandler } from "./error.js";

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    // Set the CORS headers to allow requests from your frontend domain
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Methods", "POST"); // Allow only POST requests
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow sending cookies

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};

export default ErrorHandler;
