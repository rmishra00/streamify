const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    index: true
  },
  releaseYear: {
    type: Number
  },
  duration: {
    type: Number
  },
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  thumbnail: {
    type: String
  },
  videoPath: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true }
)

module.exports = mongoose.model("Movie", movieSchema)