const express = require('express');
const router = express.Router();
const {addMovie, getMovies, searchMovies, streamMovie, uploadMovieVideo, updateMovie, deleteMovie} = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const upload = require('../config/multer')
router.post('/',authMiddleware, adminMiddleware, addMovie);
router.put('/:id', authMiddleware,adminMiddleware, updateMovie);
router.delete('/:id', authMiddleware,adminMiddleware, deleteMovie);
router.get('/', getMovies);
router.get('/search', searchMovies);
router.post('/:id/upload', authMiddleware, adminMiddleware, upload.single('video'), uploadMovieVideo)
router.get('/:id/stream', streamMovie);

module.exports = router;