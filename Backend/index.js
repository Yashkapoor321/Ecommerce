const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const cookieParser = require("cookie-parser");

//Middlewares
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_URI)
  .then(()=> console.log("Database connected successfully"))
  .catch((error) => console.log("Database error", error));


// Routes
app.use("/api/v1/user", userRoute);


app.listen(PORT, () => {
    console.log(`Server is up and running at PORT ${PORT}`);
})