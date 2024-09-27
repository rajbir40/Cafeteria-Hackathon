import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const images = [
    'https://images.unsplash.com/photo-1532269748385-a458d8ee473e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://media.istockphoto.com/id/1363407092/photo/two-big-homemade-delicious-cheeseburger-with-onion-grilled-bacon-fresh-tomatoes-cheese-and.webp?a=1&b=1&s=612x612&w=0&k=20&c=c1OKn653WjQLTHBeaL1zv-ApW42H3ArcRl2OMBTMASA=',
    'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to switch to the next image
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden"> {/* Full screen height */}
      <div 
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div className="min-w-full h-full" key={index}>
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" /> {/* Full screen image */}
          </div>
        ))}
      </div>

      {/* Centered Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-white text-3xl md:text-5xl font-bold p-4 bg-black bg-opacity-50 rounded-lg">
          Savor the freshness, <br />bite into happiness!
        </div>
      </div>

      {/* Previous Button */}
      <button
        onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8249;
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Carousel;
