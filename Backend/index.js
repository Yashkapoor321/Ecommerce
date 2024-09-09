const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");


mongoose
  .connect(process.env.DATABASE_URI)
  .then(()=> console.log("Database connected successfully"))
  .catch((error) => console.log("Dtabse error", error));





app.listen(PORT, () => {
    console.log(`Server is up and running at PORT ${PORT}`);
})