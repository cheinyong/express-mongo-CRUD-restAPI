var express = require('express');
const path = require('path');
var router = express.Router();
const movies=require('./../controller/movieController');


router.get('/',movies.getAllMovie);
router.get('/:movieId',movies.getMovieById);
router.post('/',movies.createMovie);
router.get('/title/:title',movies.findMovieByTitle);
router.put('/:movieId',movies.updateMovie);
router.delete('/:movieId',movies.deleteMovie);

module.exports = router;