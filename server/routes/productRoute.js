const express = require("express");
const { addCategory, createProduct, getProduct, getProductById, updateProduct, getCategories, deleteProduct, createProductReview } = require("../controller/productController");
const { protect, admin } = require('../middleware/authMiddleware')
const router = express.Router();

router.get('/', getProduct);
router.get('/categories', protect, admin, getCategories);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.post('/addcategory', protect, admin, addCategory);
router.delete('/:id', protect, admin, deleteProduct);
router.post('/:id/reviews', protect, createProductReview)




module.exports = router