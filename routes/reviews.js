var express = require('express');

var router = express.Router();
const review=require('./../controller/reviewController')

router.get('/',review.getAllReview);
router.get('/:reviewId',review.getReviewById);
router.get('/movie/:movieId',review.getReviewByMovieId);
router.post('/',review.saveReview);
router.put('/:reviewId',review.updateReview);
router.delete('/:reviewId',review.deleteReview)

module.exports = router;