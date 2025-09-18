const express =require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

router.route('/')
    .get(postController.getAllPosts)
    .post(protect, postController.createOnePost);

router.route('/:id')
    .get(postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

module.exports = router;