const express = require("express");
const { protect, admin } = require('../middleware/authMiddleware');
const { getCategories, addCategory, deleteCategory } = require("../controller/categoryController");
const router = express.Router();

router.get('/', getCategories);
router.post('/addcategory', protect, admin, addCategory);
router.delete('/:id', deleteCategory);

module.exports = router