//Taylor Zweigle, 2024
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const eventRoutes = require("./routes/events");

const app = express();

app.use(express.json());

app.use("/api/events", eventRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}...`);
    });
  })
  .catch((error) => console.log(error));
