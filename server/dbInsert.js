const mongoose = require("mongoose");
const dotenv = require('dotenv');
const users = require("./data/user.js");
const products = require('./data/product.js');
const User = require('./models/userModel.js');
const Product = require('./models/productModel.js');
const Order = require('./models/orderModel.js');
const connectDB = require('./config/db.js');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        // await Order.deleteMany();
        await Product.deleteMany();
        // await User.deleteMany();

        // const createdUsers = await User.insertMany(users)
        // const adminUser = createdUsers[1]._id;

        const insertedProducts = products.map((product) => {
            return {
                ...product,
                user: new mongoose.Types.ObjectId('657d38065ac0fcfafa7005d9')
            };
        });

        await Product.insertMany(insertedProducts);

        console.log('Data imported');
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

const destroyData = async () => {
try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed')
    process.exit()
} catch (error) {
    console.log(error);
    process.exit(1);
}
}

if (process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}