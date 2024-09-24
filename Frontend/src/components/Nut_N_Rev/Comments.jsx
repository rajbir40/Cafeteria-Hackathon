import React from 'react'

function Comments() {
  return (
    <div>
      <div className="bg-gray-100 p-6">
    <h2 className="text-lg font-bold mb-4">Reviews</h2>
    <div className="flex flex-col space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">John Doe</h3>
            <p className="text-gray-700 text-sm mb-2">Posted on April 17, 2023</p>
            <p className="text-gray-700">This is a sample comment. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Jane Smith</h3>
            <p className="text-gray-700 text-sm mb-2">Posted on April 16, 2023</p>
            <p className="text-gray-700">I agree with John. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Bob Johnson</h3>
            <p className="text-gray-700 text-sm mb-2">Posted on April 15, 2023</p>
            <p className="text-gray-700">I have a different opinion. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
        
    </div>
</div>
    </div>
  )
}

export default Comments
