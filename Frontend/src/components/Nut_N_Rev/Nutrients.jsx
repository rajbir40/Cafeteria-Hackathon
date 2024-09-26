import React, { useContext } from "react";
import Table from "./Table";
import { CartContext } from "../Cart/CartContext"; // Import CartContext
import { useUser } from "../userContext"; // Import useUser for user authentication check

function Nutrients({ item }) {
  const { _id, item_src, item_title, nutrients, item_price } = item;

  // Access cart functions from the CartContext
  const { addItemToCart, cartItems, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } = useContext(CartContext);
  const { user } = useUser();

  const handleAddToCart = () => {
    if (user) {
      addItemToCart(item);
    } else {
      alert("Please Sign In to Add Items to your Cart.");
    }
  };

  const handleRemoveFromCart = () => {
    removeItemFromCart(_id);
  };

  const itemInCart = cartItems.find((cartItem) => cartItem._id === _id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  return (
    <div className=" ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                className="w-full h-full object-cover"
                src={item_src}
                alt="Product Image"
              />
            </div>
            <div className="flex justify-center -mx-2 mb-4">
              {quantityInCart > 0 ? (
                <div className="w-1/2 px-2 flex flex-col items-center">
                  <div className="flex items-center">
                    <button className="bg-gray-900 text-white py-1 px-2 rounded" onClick={() => decreaseItemQuantity(_id)}>
                      -
                    </button>
                    <span className="mx-2">{quantityInCart}</span>
                    <button className="bg-gray-900 text-white py-1 px-2 rounded" onClick={() => increaseItemQuantity(_id)}>
                      +
                    </button>
                  </div>
                  <button className="bg-red-500 text-white py-1 px-4 mt-2 rounded" onClick={handleRemoveFromCart}>
                    Remove from Cart
                  </button>
                </div>
              ) : (
                <div className="w-1/2 px-2">
                  <button
                    className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-black mt-3">
              {item_title}
            </h2>
            <div className="md:flex-1 px-4">
              <Table Nutrients={nutrients} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nutrients;
