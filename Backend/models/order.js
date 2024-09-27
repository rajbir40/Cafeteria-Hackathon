const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    delivery_address: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    payment_method:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:false,
        default:null,
    },
    status: {
        type: String,
        default: "Order placed",  
        enum: ["Order placed", "Being prepared", "Ready for pickup", "Delivered"],  
    },
    preparing:{
        type:Boolean,
        required:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
        required: true
    }
},{timestamps:true});

const ORDER = mongoose.model("Order", orderSchema);

module.exports = ORDER;
