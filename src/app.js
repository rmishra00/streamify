const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes')


const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req,res)=> {
  res.status(200).json({
    message:"Streamify is running"
  })
})

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes)


module.exports = app;