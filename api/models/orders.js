const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    order_id: {
        type:Number,
        required: [true,'must provide order_id'],
        trim:true
    }, 
    item_name: {
        type: String,
        required: [true, 'must provide item_name'],
        trim: true
    }, 
    cost: {
        type: Number,
        required: [true, 'must provide cost'],
        trim: true
    }, 
    order_date: {
        type: String,
        required: [true, 'must provide order_date'],
        trim: true
    }, 
    delivery_date: {
        type: String,
        required: [true, 'must provide delivery_date'],
        trim: true
    }
})

module.exports = mongoose.model('orders',TaskSchema)