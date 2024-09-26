import React, { useState,useContext } from 'react';
import './Navbar.css'; // Import CSS file
import '../../index.css';
import icon from '../../assets/icon.svg';
import locationIcon from '../../assets/location.svg';
import searchIcon from '../../assets/icons8-search-50.svg';
import discountIcon from '../../assets/discount.svg';
import cartIcon from '../../assets/shopping-cart-icon.svg';
import signInIcon from '../../assets/sign-in.svg';
import { useUser } from '../userContext';
import { useCookies } from 'react-cookie';
import { CartContext } from '../Cart/CartContext';
import AboutIcon from "../../assets/icons8-about.svg"
import mr_dewsis from "../../assets/mr_dewsis.png";
import dewsis_small from "../../assets/dewsis_small.png";

function Navbar() {
  const { user, updateUser } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['token', 'cartItems']);
  const { clearCart, cartItems } = useContext(CartContext); 

  const size = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    removeCookie('token', { path: '/' });
    updateUser(null);
    
    clearCart();
    removeCookie('cartItems', { path: '/' });

    window.location.reload();
  };

  return (
    <header className="top-nav">
      <div className="small-device-menu">
        <div className="menu-top">
          <div className={`menu-icon-box ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <label className={`menu-line menu-line1 ${menuOpen ? 'menu-close1' : ''}`}></label>
            <label className={`menu-line menu-line2 ${menuOpen ? 'menu-close2' : ''}`}></label>
            <label className={`menu-line menu-line3 ${menuOpen ? 'menu-close3' : ''}`}></label>
          </div>
          <a href="/"><img className="icon-img" src={dewsis_small} alt="" /></a>
        </div>
        <div className={`menu-content ${menuOpen ? 'active' : ''}`}>
          <div className="menu-ol">
            <ul className="menu-items">
              <li className="home-mobile"><a href="/">Home</a></li>
              <li className="home-mobile"><a href="/menu">Menu</a></li>
              {user ? (
                <>
                  {user.role === "Admin" ? <li className="sign-in-mobile"><a href="/admin">Admin</a></li> 
                    : <li className="sign-in-mobile"><a href="/profile">Profile</a></li> 
                  }
                   <li className="sign-out" onClick={handleSignOut}><a >Sign Out</a></li>
                </>
              ) : (
                <>
                  <li className="sign-in-mobile"><a href="/sign-in">Sign In</a></li>
                  <li className="sign-in-mobile"><a href="/sign-up">Sign Up</a></li>
                </>
              )}
              <li><a href="#">Contact Us</a></li>
              <li><a href="/about-us">About Us</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="top-nav-box">
        <div className="top-nav-box1">
          <div className="icon">
            <a href="/"><img src={mr_dewsis} className="icon-img" alt="" /></a>
          </div>
          
        </div>
        <div className="nav-right-menu">
        <div className="shopping-cart-box btn-box border-right">
            <a href="/about-us" className='anchorTag'><img src={AboutIcon} alt="" className="icon-svg btn-icon" />
              <p className='my-2'>About</p></a>
          </div>
          <div className="discount-box btn-box border-right">
            <a href="/menu" className='anchorTag'><img src={discountIcon} alt="" className="icon-svg btn-icon" />
              <p className='my-2'>Menu</p></a>
          </div>
          <div className="shopping-cart-box btn-box border-right shopping-cart-box-float">
            <a href="/cart" className='anchorTag'><img src={cartIcon} alt="" className="icon-svg btn-icon" />
            <p className='cart-text'>{size}</p>
              <p className='my-2'>Cart</p></a>
          </div>
          <div className="sign-in-box btn-box w-48">
            {user ? (
              <div className="user-info">
                <div className="dropdown mr-[150px]">
                  <button className="dropdown-toggle" type="button" aria-haspopup="true" aria-expanded={menuOpen ? 'true' : 'false'} onClick={toggleMenu}>
                    <img  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Icon" className=" py2 w-10 " />
                  </button>
                  <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`} aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Welcome, {user.fullName.split(" ")[0]}</a>
                    {user.role === "Admin" ? <a className="dropdown-item" href="/admin">Go to Admin</a>
                    : <a className="dropdown-item" href="/profile">Go to Profile</a>  
                  }
                    <a className="dropdown-item" onClick={handleSignOut}>Sign Out</a>
                  </div>
                </div>
              </div>
            ) : (
              <a href="/sign-in" className='anchorTag'><img src={signInIcon} alt="" className="icon-svg btn-icon" />
                <p className='my-2'>Sign In</p></a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
