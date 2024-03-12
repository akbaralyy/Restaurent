import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

const allowedOrigins = [process.env.FRONTEND_URL]; // Update with your frontend URL

app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is in the allowedOrigins array
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);

dbConnection();
app.use(errorMiddleware);

export default app;
