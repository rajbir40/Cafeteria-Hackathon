const mongoose = require("mongoose");

const nutrientsSchema = new mongoose.Schema({
      calories: String,
      fat: String,
      protein: String,
      carbohydrates: String,
      cholestrol: String,
      createdAt: {
            type:Date,
            default:Date.now()
      }
},{timestamps:true});

const NUTRIENTS = mongoose.model("Nutrients", nutrientsSchema);

module.exports = NUTRIENTS