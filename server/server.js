const express = require('express')
const dotenv = require('dotenv')
dotenv.config();
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');
const path = require('path');
const productRoutes = require('./routes/productRoute');
const userRoutes = require("./routes/userRoute");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

connectDB();
const app = express();

// Body parse middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// cookie-parser middleware
app.use(cookieParser());

// app.get('/', (req, res) => {
// res.send('BACKEND READY')
// })

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// app.use(notFound);
app.use(errorHandler);
app.use(express.static(path.join(__dirname, 'static')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'static', 'index.html'));
  });

app.listen(port, () => {console.log(`server running on port ${port}`)})