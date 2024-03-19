import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

// Load environment variables
dotenv.config({ path: "./config/config.env" });
let corsAllow = {
  origin :process.env.FRONTEND_URL,
  methods :"PUT,GET,POST,PATCH,DELETE,HEAD",
  credentials : true
}

const app = express();

app.use(cors(corsAllow));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/reservation", reservationRouter);
app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "HELLO WORLD AGAIN"
  });
});

// Establish database connection
dbConnection();

app.use(errorMiddleware);

export default app;
