const asyncHandler = require("../middleware/asyncHandler");
const Product = require('../models/productModel');

// @desc Fetch all Products
// @route GET /api/products
// @access Public
const getProduct = asyncHandler( async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch a product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
       return res.json(product)
    }
    res.status(404)
    throw new Error('Product not found');
})

module.exports = { getProduct, getProductById }