const express = require("express");
const { createProduct, getProduct, getProductById, updateProduct, deleteProduct, createProductReview } = require("../controller/productController");
const { protect, admin } = require('../middleware/authMiddleware')
const router = express.Router();

router.get('/', getProduct);
router.get('/:id', getProductById);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.post('/:id/reviews', protect, createProductReview)




module.exports = router