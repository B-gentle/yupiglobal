import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import products from './data/product.js';
const port = process.env.PORT || 5000;

connectDB();
const app = express();

app.get('/', (req, res) => {
res.send('BACKEND READY')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.get('/api/products/:id', (req, res) => {
    const product = products.find((p) => p._id.toString() === req.params.id.toString());
    res.json(product)
})

app.listen(port, () => {console.log(`server running on port ${port}`)})