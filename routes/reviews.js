const express = require('express');
const router = express.Router({mergeParams : true});
const { asyncErrorHandler, isReviewAuthor } = require("../middleware");

const {createReview, updateReview, destroyReview} = require("../controllers/reviews");





/* Post  create review /posts/:id/reviews */
router.post('/', asyncErrorHandler(createReview));

/* Put  update review /posts/:id/reviews/:review_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(updateReview));

/* DELETE  destroy  review /posts/:id/reviews/:review_id */
router.delete('/:review_id', isReviewAuthor, asyncErrorHandler(destroyReview));






module.exports = router;
