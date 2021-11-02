const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true
    }, 
    description: {
        type: String,
        trim: true
    }, 
    due_date: {
        type: Date,
        required: [true, 'must provide due date'],
        trim: true
    },
    is_completed: {
        type: Boolean,
        required: [true, 'must provide completion status'],
        trim: true
    }
})

module.exports = mongoose.model('tasks',TaskSchema)