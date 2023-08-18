const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const { errorHandler, notFound } = require("./middleware/errorMiddleware.js");
const cors = require("cors");
const router = require("./routes/UserRoute.js");
const connectDB = require("./config/db.js");
dotenv.config();

connectDB();



const app = express(); // main thing

app.use(express.json()); // to accept json data

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/user", router);

// --------------------------deployment------------------------------


if (process.env.NODE_ENV === "production") {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7070;

app.listen(
  PORT,
  // Thehindubusinessline(),
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
