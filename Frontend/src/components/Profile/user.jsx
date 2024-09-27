import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import { useCookies } from 'react-cookie';
import { CartContext } from '../Cart/CartContext';
import axios from 'axios';

// const serverURL = "http://192.168.54.63:5000"
const serverURL = "http://localhost:5000"

function UserProfile() {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    mobile: '',
    role: '',
    RecentOrders: [],
  });
  const [Rewform,setForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [review,setReview] = useState("");

  const [b2,setB2] = useState(false);
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    _id: '',
    fullName: '',
    email: '',
    mobile: '',
  });
  const [message,setMessage] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const { clearCart } = useContext(CartContext);

  const fetchUserData = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const response = await fetch(`${serverURL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const sortedOrders = userData.RecentOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUser({ ...userData, RecentOrders: sortedOrders });
        setUpdatedUserInfo({
          _id: userData._id,
          fullName: userData.fullName,
          email: userData.email,
          mobile: userData.mobile,
        });
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [cookies]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const response = await fetch(`${serverURL}/api/user/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserInfo),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        if (updatedUserData && updatedUserData.user) {
          alert('User information updated successfully');
          setEditMode(false);
          setUser(updatedUserData.user);
        } else {
          console.error('Failed to get updated user data');
        }
      } else {
        console.error('Failed to update user information');
      }
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleReviewForm = () => {
    // console.log("form");
    setForm(!Rewform);
  }

  const handleReview = async (e,_id) =>{
    setB2(true);
    e.preventDefault();
    if(!review.length){
      return;
    }
    try{
      console.log("en")
      const res = await axios.post(`http://localhost:5000/api/review/item/${_id}/review` , {user:user._id,comment:review});
      if(res.status==201){
        console.log("success");
        setReview("");
        setForm(false);
        setMessage("Thanks For Your Review")
        setB2(false);
      }
    } catch(error){
      console.error(error);
    }
  }

  const handleDeleteAccount = async () => {
    try {
      const token = cookies.token;
      if (!token) {
        console.error('Token not found in cookies');
        return;
      }

      const confirmed = window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      );

      if (confirmed) {
        const response = await fetch(`${serverURL}/api/user/delete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert('User account deleted successfully');
          removeCookie('token');
          removeCookie('cartItems', { path: '/' });
          clearCart();
          window.location.href = '/sign-up';
        } else {
          console.error('Failed to delete user account');
        }
      }
    } catch (error) {
      console.error('Error deleting user account:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserInfo({
      ...updatedUserInfo,
      [name]: value,
    });
  };

  if (!cookies.token) {
    return (
      <div className="access-forbidden">
        <h3>Access Forbidden</h3>
        <p>Please log in to access this page.</p>
      </div>
    );
  }

  return (
    <div className="card user-card-full col-xl-8" style={{ margin: '40px auto' }}>
      <div className="row m-l-0 m-r-0">
        <div className="col-sm-4 bg-c-lite-green user-profile">
          <div className="card-block text-center text-white">
            <div className="m-b-25">
              <img
                src="https://img.icons8.com/bubbles/100/000000/user.png"
                className="img-radius"
                alt="User Profile"
              />
            </div>
            <h6 className="f-w-600">{user.role}</h6>
            {editMode ? (
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  placeholder="Full Name"
                  value={updatedUserInfo.fullName}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  className="form-control mt-3"
                  name="email"
                  placeholder="Email"
                  value={updatedUserInfo.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  className="form-control mt-3"
                  name="mobile"
                  placeholder="Mobile"
                  value={updatedUserInfo.mobile}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <div>
                <p>{user.fullName}</p>
                <p>{user.email}</p>
                <p>{user.mobile}</p>
              </div>
            )}
            <button className="btn btn-light mt-3" onClick={editMode ? handleSave : handleEdit}>
              {editMode ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        <div className="col-sm-8">
          <div className="card-block">
            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
            <div className="row">
              <div className="col-sm-6">
                <p className="m-b-10 f-w-600">Email</p>
                <h6 className="text-muted f-w-400">{user.email}</h6>
              </div>
              <div className="col-sm-6">
                <p className="m-b-10 f-w-600">Mobile</p>
                <h6 className="text-muted f-w-400">{user.mobile}</h6>
              </div>
            </div>
            <button type="button" className="btn btn-danger mt-5" onClick={handleDeleteAccount}>
              Delete Account
            </button>
            <h6 className="text-muted mt-5">Recent Orders</h6>
            {user.RecentOrders.length === 0 ? (
              <p>No Recent Orders</p>
            ) : (
              user.RecentOrders.map((order, index) => (
                <div className="card mb-3 p-2" key={index}>
                  <div className="row no-gutters">
                    <div className="col-md-4" style={{ alignSelf: "center" }}>
                      <img src={order.image} className="card-img" alt="Product" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{order.name}</h5>
                        <div className="text-container">
                          <h6>Price:</h6>
                          <p>&nbsp;&nbsp;₹{order.price}</p>
                        </div>
                        <div className="text-container">
                          <h6>Address:</h6>
                          <p>&nbsp;&nbsp;{order.delivery_address}</p>
                        </div>
                        <div className="text-container">
                          <h6>Quantity:</h6>
                          <p>&nbsp;&nbsp;{order.quantity}</p>
                        </div>
                        <div className="text-container">
                          <h6>Total Price:</h6>
                          <p>&nbsp;&nbsp;₹{order.price * order.quantity}</p>
                        </div>
                        <div className="text-container">
                          <h6>Order ID:</h6>
                          <p>&nbsp;&nbsp;{order._id}</p>
                        </div>
                        <div className="text-container">
                          <h6>Order Status:</h6>
                          <p>&nbsp;&nbsp;{order.status}</p>
                        </div>
                        
                      </div>
                    </div>
                        {order.status == "Delivered" ? (
                          <>
                          <button onClick={handleReviewForm} type="button" className='btn btn-danger mt-5 m-auto max-w-32 text-center'>{Rewform ? ("Cancel"):("Add Review")}</button>
                          {Rewform ? (
                            <>
                            
                            <form onSubmit={(e)=>handleReview(e,order.item)}>
                              <textarea name="textarea" value={review} onChange={(e)=>{setReview(e.target.value)}} id="text"  class=" h-20 w-full resize-none rounded-md border border-slate-300 p-3 my-2"></textarea>
                              <button type='submit' disabled={b2} className='btn btn-danger m-auto mt-3'>{b2 ? ("Submitting"):("Submit")}</button>
                            </form>
                            </>
                          ):(
                            <></>
                          )}
                          <p className='text-center text-red-400'>{message}</p>
                          </>
                        ):(<></>)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
