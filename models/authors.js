const mongoose = require('mongoose');
  
const Schema = mongoose.Schema;               //Define a Schema
    
const AuthorSchema = new Schema({               //Define the Authors Schema
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    dob: {
        type: String,
        required: true,
        max: [2020, 'DOB must not be less than or equal to 2020']
    },
    nationality: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    living: {
        type: Boolean,
        required: true,
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

module.exports = mongoose.model('Author', AuthorSchema); //collection name is Authors.