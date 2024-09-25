const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    _id: ObjectId,
    mealId: ObjectId,  
    userId: ObjectId,  
    rating: Number,    
    comment: String,
    createdAt: Date
},{timestamps:true});

const REVIEW = mongoose.model("Review", reviewSchema);

module.exports = {
    REVIEW,
    reviewSchema,
};
