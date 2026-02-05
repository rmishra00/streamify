const Movie = require('../models/Movie');

exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
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

    const movies = await Movie.find().
      skip(skip).
      limit(limit).
      sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({message:"Failed to fetch movies"});
  }
}

exports.searchMovies = async(req,res)=>{
  try{
    const {genre, query} = req.query;
    let filter = {};
    if(query){
      filter.title = {$regex:query, $options:"i"};
    }
    if(genre){
      filter.genre = genre;
    }
    const movies = await Movie.find(filter);
    res.status(200).json(movies);
  }catch(error){
    res.status(500).json({message:"Search failed"});
  }
}