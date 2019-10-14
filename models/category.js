var mongoose = require('mongoose');



const CategoryChildSchema = new mongoose.Schema({
    name: String,
    //  icon: String
});

const CategorySchema = new mongoose.Schema({
    type: String,
    category: [CategoryChildSchema]
});

var Category = mongoose.model('Category', CategorySchema);
module.exports = Category;

