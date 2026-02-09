const Movie = require('../models/Movie');

exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      createdBy: req.user.userId,
    });
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie" });
  }
}

exports.getMovies = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const movies = await Movie.find().populate("createdBy", "name email").
      skip(skip).
      limit(limit).
      sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch movies" });
  }
}

exports.searchMovies = async (req, res) => {
  try {
    const { genre, query } = req.query;
    let filter = {};
    if (query) {
      filter.title = { $regex: query, $options: "i" };
    }
    if (genre) {
      filter.genre = genre;
    }
    const movies = await Movie.find(filter);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
}

exports.uploadMovieVideo = async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "No video uploaded" });
    }
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    movie.videoPath = req.file.path;
    await movie.save();
    res.status(200).json({ message: "Video uploaded successfully" });
  } catch (error) {
    console.error("VIDEO UPLOAD ERROR:", error);
    res.status(500).json({
      message: "Video upload failed",
      error: error.message,
    });
  }

}

exports.streamMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie || !movie.videoPath) {
      return res.status(4).json({ message: "Video not found" });
    }
    const videoPath = movie.videoPath;
    const videoSize = fs.statSync(videoPath).size;
    const range = req.headers.range;
    if (!range) {
      return res.status(416).send("Range header required");
    }
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${videoSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (error) {
    res.status(500).json({ message: "Streaming failed" });
  }
}