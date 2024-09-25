const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    comment: String,
    createdAt: {
        type:Date,
        default:Date.now()
    }
},{timestamps:true});

const REVIEW = mongoose.model("Review", reviewSchema);

module.exports = REVIEW