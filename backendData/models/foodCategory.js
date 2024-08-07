const mongoose = require('mongoose');

const foodCategorySchema = new mongoose.Schema({
    CategoryName: {
    type: String,
    required: true
},

},{ timeStamps: true});

module.exports = mongoose.model('foodCategory', foodCategorySchema )