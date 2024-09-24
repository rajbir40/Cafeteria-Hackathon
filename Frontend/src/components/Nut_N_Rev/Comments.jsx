import React, { useState, useEffect } from 'react';

function Comments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch comments from the backend
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments'); 
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="bg-gray-100 p-6">
        <h2 className="text-lg font-bold mb-4">Reviews</h2>
        <div className="flex flex-col space-y-4">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-bold">{comment.name}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  Posted on {new Date(comment.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            ))
          ) : (
            <div>No comments available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comments;
