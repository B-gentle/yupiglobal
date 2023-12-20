const express = require("express");
const { getProduct, getProductById } = require("../controller/productController");
const router = express.Router();

router.get('/', getProduct)
router.get('/:id', getProductById)


module.exports = router