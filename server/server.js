const path = require('path');
const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoute');
const userRoutes = require("./routes/userRoute");
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// cookie-parser middleware
app.use(cookieParser());


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes)

// app.use(notFound);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'client')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
  });

app.listen(port, () => {console.log(`server running on port ${port}`)})