const express  = require('express');
const { getAllCategories, addCategory } = require('../controllers/categoryController.js');

const router = express.Router();

router.get('/', getAllCategories);
router.post('/add', addCategory);


module.exports = router;