const express = require("express");
const router = express.Router();

app.post('/meals/:mealId/review', async (req, res) => {
    const { mealId } = req.params;
    const { userId, rating, comment } = req.body;
  
    try {
      // Create new review
      const review = new Review({
        mealId,
        userId,
        rating,
        comment,
        createdAt: new Date()
      });
  
      await review.save();
  
      // Find the meal and update its avgRating and numReviews
      const meal = await Meal.findById(mealId);
      meal.numReviews += 1;
      meal.avgRating =
        (meal.avgRating * (meal.numReviews - 1) + rating) / meal.numReviews;
      await meal.save();
  
      res.status(201).send({ message: 'Review added successfully' });
    } catch (err) {
      res.status(500).send({ message: 'Error adding review', error: err });
    }
  });

  app.get('/meals/:mealId/reviews', async (req, res) => {
    const { mealId } = req.params;
  
    try {
      const reviews = await Review.find({ mealId }).populate('userId', 'name');
      res.status(200).send(reviews);
    } catch (err) {
      res.status(500).send({ message: 'Error fetching reviews', error: err });
    }
  });
  