const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    subCategory: [{
        name:{
            type: String,
        }
    }]
}, {
    timestamps: true
})

const Categories = mongoose.model("categories", categorySchema)
module.exports = Categories