import React, { useContext, useEffect, useState } from 'react';
import InfoImage from '../../assets/info.svg';
import VegIcon from "../../assets/veg.svg";
import { CartContext } from '../Cart/CartContext';
import { useUser } from "../userContext";
const serverURL = "http://localhost:5000";

const FoodItem = ({ item, fetchItems }) => {
  const { _id, item_src, item_title, item_type, item_price, item_offer } = item;
  const foodTypeClass = item_type === "veg" ? "type-veg" : "type-nonveg";
  const { addItemToCart, cartItems, increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } = useContext(CartContext);
  const { user } = useUser();
  const [isDeleted, setIsDeleted] = useState(false);

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

  const deleteItem = async () => {
    try {
      const response = await fetch(`${serverURL}/api/item/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log('Item deleted successfully');
        setIsDeleted(true);
      } else {
        console.error('Error deleting item:', response.statusText);
      }
    } catch(error){
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    if (isDeleted) {
      fetchItems();
      console.log('Item deletion detected, updating...');
      setIsDeleted(false);
    }
  }, [isDeleted, fetchItems]);

  const itemInCart = cartItems.find((cartItem) => cartItem._id === _id);
  const quantityInCart = itemInCart ? itemInCart.quantity : 0;

  return (
    <>
      <div className="item-card">
        <img src={item_src} alt="" className="item-image" />
        <div className="card-box">
          <div className="item-title">
            <img src={VegIcon} alt="" className={`veg-nonveg ${foodTypeClass}`} />
            <p className="item-title-text">{item_title}</p>
          </div>
          <div className="purchase-box">
            <p className="price">₹ {item_price}</p>
            {quantityInCart > 0 ? (
              <div className="quantity-controll">
                <div>
                  <button className="quantity-btn" onClick={() => decreaseItemQuantity(_id)}> - </button>
                  <span className="quantity">{quantityInCart}</span>
                  <button className="quantity-btn" onClick={() => increaseItemQuantity(_id)}> + </button>
                </div>
                <button className="remove-cart-btn" onClick={handleRemoveFromCart}>Remove</button>
              </div>
            ) : (
              <button className="purchase-btn" onClick={handleAddToCart}>Add to Cart</button>
            )}
          </div>
          <div className="item-offer">
            <p className="item-offer-text">{item_offer}</p>
            <div className="offer-info-div">
              <img src={InfoImage} alt="" className="offer-info" />
              <div className="offer-info-pop">Hurry Up Order Now</div>
            </div>
          </div>

          {user && user.role === 'Admin' && (
            <button className="delete-btn" onClick={deleteItem}>
              Delete Item
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default FoodItem;
