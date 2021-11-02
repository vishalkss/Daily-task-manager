const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'must provide email'],
        // trim: true
    },
    password: {
        type: String,
        required: [true, 'must provide password'],
        // trim: true
    }
})

module.exports = mongoose.model('users', LoginSchema)