const express = require('express');
const router = express.Router();

/* GET posts index /posts */
router.get('/', (req, res, next)=> {
  res.send("POSTS HOME PAGE")
});

/* GET new post /posts/new */
router.get('/new', (req, res, next)=> {
  res.send("New Post")
});

/* POST create post /posts */
router.post('/', (req, res, next)=> {
  res.send("Cretae new post")
});

/* GET show post /posts/:id */
router.get('/:id', (req, res, next)=> {
  res.send("Show post")
});

/* GET edit post  /posts/:id/edit */
router.get('/:id/edit', (req, res, next)=> {
  res.send("Edit Post")
});

/* Put  update post  /posts/:id */
router.put('/:id', (req, res, next)=> {
  res.send("Update Post")
});

/* DELETE  destroy post  /posts/:id */
router.delete('/:id', (req, res, next)=> {
  res.send("Destroy Post")
});



module.exports = router;
