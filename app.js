const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const roomRouter = require("./routes/roomRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const globalErrorHandeler = require("./controllers/errorController");

const app = express();

const corsOptions = {
  origin: [
    // URL er last e kokhon o '/' debe na
    "http://localhost:5173",
  ],
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/booking", bookingRouter);

app.use(globalErrorHandeler);

module.exports = app;
