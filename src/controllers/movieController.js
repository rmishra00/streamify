const Movie = require('../models/Movie');
const fs = require("fs");
const AppError = require("../utils/AppError");

exports.addMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      ...req.body,
      createdBy: req.user.userId,
    });

    res.status(201).json(movie);

  } catch (error) {
    next(error);
  }
};


exports.getMovies = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .populate("createdBy", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const formattedMovies = movies.map(movie => ({
      movieId: movie._id,
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      duration: movie.duration,
      rating: movie.rating,
      videoPath: movie.videoPath,
      createdBy: {
        userId: movie.createdBy._id,
        name: movie.createdBy.name,
        email: movie.createdBy.email
      },
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt
    }));

    res.status(200).json(formattedMovies);

  } catch (error) {
    next(error);
  }
};


exports.searchMovies = async (req, res, next) => {
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
    next(error);
  }
};


exports.uploadMovieVideo = async (req, res, next) => {
  try {

    const movieId = req.params.id;

    if (!req.file) {
      throw new AppError("No video uploaded", 400);
    }

    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new AppError("Movie not found", 404);
    }

    movie.videoPath = req.file.path;
    await movie.save();

    res.status(200).json({ message: "Video uploaded successfully" });

  } catch (error) {
    next(error);
  }
};


exports.streamMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie || !movie.videoPath) {
      throw new AppError("Video not found", 404);
    }

    const videoPath = movie.videoPath;
    const videoSize = fs.statSync(videoPath).size;

    const range = req.headers.range;

    if (!range) {
      throw new AppError("Range header required", 416);
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
    next(error);
  }
};


exports.updateMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw new AppError("Movie not found", 404);
    }

    if (movie.createdBy.toString() !== req.user.userId) {
      throw new AppError("Not authorized to update this movie", 403);
    }

    Object.assign(movie, req.body);

    await movie.save();

    res.status(200).json(movie);

  } catch (error) {
    next(error);
  }
};


exports.deleteMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throw new AppError("Movie not found", 404);
    }

    if (movie.createdBy.toString() !== req.user.userId) {
      throw new AppError("Not authorized to delete this movie", 403);
    }

    await movie.deleteOne();

    res.status(200).json({ message: "Movie deleted successfully" });

  } catch (error) {
    next(error);
  }
};