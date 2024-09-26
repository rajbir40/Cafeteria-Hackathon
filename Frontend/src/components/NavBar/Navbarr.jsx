import React, { useState,useContext } from 'react';
import './Navbar.css'; // Import CSS file
import '../../index.css';
import { useUser } from '../userContext';
import { useCookies } from 'react-cookie';
import { CartContext } from '../Cart/CartContext';
import mr_dewsis from "../../assets/mr_dewsis.png";
import dewsis_small from "../../assets/dewsis_small.png";

function Navbarr() {

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

    <div>
      <header className="bg-black">
  <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      <div className="flex-1 md:flex md:items-center md:gap-12">
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <img className="h-8 min-h-8 min-w-28"   src={mr_dewsis}/>
      
        </a>
      </div>

      <div className="md:flex md:items-center md:gap-12">
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-6 text-sm">
            <li>
              <a className="text-green-600 transition hover:text-green-300" href="/about-us"> About </a>
            </li>

            <li>
              <a className="text-green-600 transition hover:text-green-300" href="/menu"> Menu </a>
            </li>

            <li>
              <a className="text-green-600 transition hover:text-green-300" href="/cart"> Cart </a>
              {/* <p className='cart-text'>{size}</p>s */}
            </li>


          </ul>
        </nav>
        {user ? (

              <div className="user-info">
                <div className="dropdown mr-[150px]">
                  <button className="hidden md:block" type="button" aria-haspopup="true" aria-expanded={menuOpen ? 'true' : 'false'} onClick={toggleMenu}>
                    <img  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Icon" className=" py2 w-8 " />
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
                <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <a
                    className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                    href="/sign-in"
                  >
                    Sign-in
                  </a>
                </div>
      
                <div className="block md:hidden">
                  <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
        {/* <DropDown/> */}
      </div>
    </div>
  </div>
</header>
    </div>
  )
}

export default Navbarr
