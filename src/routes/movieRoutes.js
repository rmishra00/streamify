const express = require('express');
const router = express.Router();
const {addMovie, getMovies, searchMovies} = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware, addMovie);
router.get('/', getMovies);
router.get('/search', searchMovies);

module.exports = router;