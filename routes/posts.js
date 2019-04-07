const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {cloudinary, storage} = require("../cloudinary");
const upload = multer({storage})

const { getPosts , newPost , createPost, showPost, editPost, updatePost, deletePost} = require("../controllers/post");
const { asyncErrorHandler , isPostAuthor, isLoggedIn} = require("../middleware");



/* GET posts index /posts */
router.get('/',asyncErrorHandler(getPosts));

/* GET new post /posts/new */
router.get('/new',isLoggedIn, newPost);

/* POST create post /posts */
router.post('/',isLoggedIn, upload.array('images', 3), asyncErrorHandler(createPost));

/* GET show post /posts/:id */
router.get('/:id',asyncErrorHandler(showPost));

/* GET edit post  /posts/:id/edit */
router.get('/:id/edit',isLoggedIn, isPostAuthor, asyncErrorHandler(editPost));

/* Put  update post  /posts/:id */
router.put('/:id',isLoggedIn, isPostAuthor,upload.array('images', 3), asyncErrorHandler(updatePost));

/* DELETE  destroy post  /posts/:id */
router.delete('/:id',isLoggedIn, isPostAuthor,asyncErrorHandler(deletePost));



module.exports = router;
