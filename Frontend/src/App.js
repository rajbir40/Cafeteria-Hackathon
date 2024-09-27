import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/Cart/CartContext';
import NavBar from './components/NavBar/navbar.jsx';
import Home from './components/Home/home';
import Footer from './components/Footer/footer';
import MenuPage from './components/Menu/menu';
import Login from './components/Login/login.jsx';
import SignUp from './components/SignUp/signup.jsx';
import UserProfile from './components/Profile/user.jsx';
import AddItem from './components/Items/Form.jsx';
import ShoppingCart from './components/Cart/ShoppingCart.jsx';
import ErrorPage from './components/Error/error';
import AdminDashboard from './components/Admin/AdminPage';
import AboutUs from './components/About-Us/aboutpage';
import Info from './components/Nut_N_Rev/Info';
import OtpVerify from './components/Otp_verify/Otp_verify.jsx';
import axios from 'axios';
import Navbarr from './components/NavBar/Navbarr';

const serverURL = 'http://localhost:5000';

function App() {
  const [Items, setItems] = useState([]);
  const [Orders, setOrders] = useState([]); // Initialize Orders as an empty array

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${serverURL}/api/orders`);
      const data = await response.json();
      console.log('Fetched orders:', data); // Log the response for debugging
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  

  fetchOrders();
}, []);

  if (!Orders) {
    return <div>Loading...</div>
  }

  // Handle empty states in the mapping logic below
  if (!Items || !Orders) {
    
    return <div>Loading...</div>;
  }

  const items = Items || [];
  const orders = Array.isArray(Orders) ? Orders : [];



  return (
    <CartProvider>
      <Router>
        <div className="main-body">
          {/* <NavBar /> */}
          <Navbarr/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<ShoppingCart />} />
            
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-items" element={<AddItem />} />
            <Route path="/about-us" element={<AboutUs />} />

            {items.map((item) =>
              <Route
                key={item._id}
                path={`/info/${item._id}`}
                element={<Info item={item} />}
              />
            )}

            {orders.length>0  && orders.map((order) => (
              <Route
                key={order._id}
                path={`/verify_otp/${order._id}`}
                element={<OtpVerify order={order} />}
              />
            ))}
            


            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
