const express  = require('express');
const { getAllposts, addPost, getPostById, deletePost, getPostByCategory, getPostWithCategory } = require('../controllers/postController');

const router = express.Router();

router.get('/', getAllposts);
router.post('/add', addPost);
router.get('/:id', getPostById);
router.delete('/:id', deletePost);
router.get('/group/category', getPostWithCategory);
router.get('/group/:category', getPostByCategory);



module.exports = router;