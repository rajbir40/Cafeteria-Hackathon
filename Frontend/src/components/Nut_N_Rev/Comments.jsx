import React, { useState, useEffect } from "react";

function Reviews({ item }) {
  const [reviews, setReviews] = useState([]);

  // Set the reviews from the item prop when it's available
  useEffect(() => {
    if (item && item.reviews) {
      setReviews(item.reviews);
    }
  }, [item]);

  return (
    <div>
      <div className="bg-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">Reviews</h2>
        <div className="flex flex-col space-y-4">
          {reviews.length > 0 ? (
            reviews.map((comment) => (
              <div
                key={comment._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h3 className="text-lg font-bold">{comment.user.fullName}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Posted on{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            ))
          ) : (
            <div>No reviews available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
