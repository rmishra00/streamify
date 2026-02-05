const express = require('express');
const router = express.Router();
const {addMovie, getMovies, searchMovies} = require('../controllers/movieController');

router.post('/', addMovie);
router.get('/', getMovies);
router.get('/search', searchMovies);

module.exports = router;