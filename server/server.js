import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import productRoutes from './routes/productRoute.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();
const app = express();

// app.get('/', (req, res) => {
// res.send('BACKEND READY')
// })

app.use('/api/products', productRoutes);

// app.use(notFound);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'static')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
  });

app.listen(port, () => {console.log(`server running on port ${port}`)})