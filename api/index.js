const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const listRoutes = require("./routes/listRoutes");



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection success"))
    .catch(err => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/lists", listRoutes);




app.listen(8800, () => {
    console.log("server is running!");
});
