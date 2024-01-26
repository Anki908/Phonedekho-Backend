const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const phoneRouter = require("./routes/phoneRoute");
const { globalErrorHandle } = require("./middlewares/globalErrorHandle");
const userRouter = require("./routes/userRoute");
const { authenticateUser } = require("./middlewares/userAuth");
const cookieParser = require('cookie-parser');
require('express-async-errors');

dotenv.config({ path: "./config.env" });

const db = process.env.DATABASE;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/phones",  authenticateUser , phoneRouter);

app.use("/api/v1/user" , userRouter);

app.use("*", (req, res) => {
  res.status(400).json({
    msg: "Route Not Found",
  });
});

app.use(globalErrorHandle);

try {
  mongoose.connect(db);
  console.log("DB connected");
  app.listen(501, () => {
    console.log("server started");
  });
} catch (err) {
  console.log("Connection failed");
}
