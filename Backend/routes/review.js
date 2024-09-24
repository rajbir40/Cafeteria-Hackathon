const express = require("express");
const Review = require("../models/review")
const Item = require("../models/item")

const router = express.Router();

router.post('/item/:Id/review', async (req, res) => {
    const { Id } = req.params;
    const { userId,comment } = req.body;
  
    try {
      const item = await Item.findById(Id);
      if(!item){
        return res.status(401).json({error:"Item not found"});
      }
      // Create new review
      const review = new Review({
        userId,
        comment,
      });

      item.reviews.push(review._id)
  
      await review.save();

      await item.save();
  
      res.status(201).send({ message: 'Review added successfully' });
    } catch (err) {
      res.status(500).send({ message: 'Error adding review', error: err });
    }
  });


  module.exports = router;