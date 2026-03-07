const express = require('express');
const router = express.Router();
const {addMovie, getMovies, searchMovies, streamMovie, uploadMovieVideo, updateMovie, deleteMovie} = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer')
router.post('/',authMiddleware, addMovie);
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);
router.get('/', getMovies);
router.get('/search', searchMovies);
router.post('/:id/upload', authMiddleware, upload.single('video'), uploadMovieVideo)
router.get('/:id/stream', streamMovie);

module.exports = router;