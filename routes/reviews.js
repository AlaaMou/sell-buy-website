const express = require('express');
const router = express.Router({mergeParams : true});



/* Post  create review /posts/:id/reviews */
router.post('/', (req, res, next)=> {
  res.send("Create Review")
});

/* Put  update review /posts/:id/reviews/:review_id */
router.put('/:review_id', (req, res, next)=> {
  res.send("Update Review")
});

/* DELETE  destroy  review /posts/:id/reviews/review_id */
router.delete('/:review_id', (req, res, next)=> {
  res.send("Destroy review")
});






module.exports = router;
