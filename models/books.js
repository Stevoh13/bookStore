const mongoose = require('mongoose');
  
const Schema = mongoose.Schema;               //Define a Schema
    
const BookSchema = new Schema({               //Define the Book Schema
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: false,
    },
    year: {
        type: Number,
        required: true,
        max: [2023, 'Year must be less than or equal to 2023'] //validation with custom message
    },
    isbn: {
        type: String,
        required: true,
        unique: [true, 'ISBN must be unique'] //validation with custom message
    },
    price: {
        type: String,
        required: true,
        min: [1000, 'Price must be greater than or equal to 1000'] //validation with custom message
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    lastUpdateAt: {                     //patch request is required here
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Bookstore', BookSchema); //collection name is Books.
