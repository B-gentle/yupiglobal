const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const connectDB = require('./config/db');
const path = require('path');
const productRoutes = require('./routes/productRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

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