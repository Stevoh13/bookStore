const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
  
const Schema = mongoose.Schema;               //Define a Schema
    
const UserSchema = new Schema({               //Define the Authors Schema
    firstName: {
        type: String,
        required: true,
        required: ['firstName must be a string']
    },
    lastName: {
        type: String,
        required: false,
        required: ['lastName must be a string']
    },
    username: {
        type: String,
        required: true,
        required: ['username must be a string']
    },
    email: {
        type: String,
        required: true,
        required: ['email must consist of a number']
    },
    password: {
        type: String,
        required: true,
        required: ['password must have six characters and at least a number']
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

UserSchema.pre('save', function(next){
    if(this.password) {
        const salt = bcrypt.genSaltSync(10)
        this.password = bcrypt.hashSync(this.password, salt)
    }
    next()
})

module.exports = mongoose.model('User', UserSchema); //collection name is Authors.