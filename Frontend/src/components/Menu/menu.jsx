import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CategoryMenu from "./CategoryMenu";
import { CartContext } from "../Cart/CartContext";
import "./menu.css";
import cartIcon from "../../assets/shopping-cart-icon.svg";

// const serverURL = "http://192.168.54.63:5000"
const serverURL = "http://localhost:5000";

const MenuPage = () => {
  const [itemCategories, setItemCategories] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchItemCategories = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get(`${serverURL}/api/add-new/food-items`);
        setItemCategories(response.data);
      } catch (error) {
        console.error("Error fetching item categories:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchItemCategories();
  }, []);

  const { cartItems } = useContext(CartContext);

  const size = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      {isFetching ? (
        <>
          <div class="flex justify-center items-center h-screen">
            <div class="rounded-full h-20 w-20 bg-green-800 animate-ping"></div>
          </div>
        </>
      ) : (
        <>
          <div>
            <CategoryMenu items={itemCategories} />
            <div className="cart-float-div btn-box">
              <a href="/cart" className="anchorTag">
                <p className="cart-size-tag">{size}</p>
                <img
                  src={cartIcon}
                  alt=""
                  className="icon-svg btn-icon cart-float"
                />
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuPage;
