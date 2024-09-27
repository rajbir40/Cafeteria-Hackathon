import React, { useState, useEffect } from "react";
import AddItemImg from "../../assets/add-items.svg";
import { useUser } from "../userContext";
import ErrorPage from "../Error/error"
// const serverURL = "http://192.168.54.63:5000"
const serverURL = "http://localhost:5000";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showPreparingOrders, setShowPreparingOrders] = useState(false);
  const [showTotalOrders, setShowTotalOrders] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${serverURL}/api/users`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${serverURL}/api/orders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const orderData = await response.json();
        setOrders(orderData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchUsers();
    fetchOrders();
  }, []);

  const totalEarnings = orders.length > 0
    ? orders.reduce((total, order) => {
        return total + parseFloat(order.price) * parseInt(order.quantity);
      }, 0)
    : 0;

  const preparingOrders = orders.filter((order) => order.preparing === true);
  const { user } = useUser();

  const handleShowPreparingOrders = () => {
    setShowPreparingOrders(true);
    setShowTotalOrders(false);
  };

  const handleShowTotalOrders = () => {
    setShowTotalOrders(true);
    setShowPreparingOrders(false);
  };

  const toggleDropdown = (orderId) => {
    setOpenDropdown((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      const response = await fetch(`${serverURL}/api/update/order/${orderId}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newstatus: status }),
      });

      if (response.ok) {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        );
        setOrders(updatedOrders);
        setSelectedStatus({ ...selectedStatus, [orderId]: status });
        console.log("Order status updated to:", status);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      {user && user.role === "Admin" ? (
        <>
          <div id="wrapper">
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                <div className="container-fluid" style={{ display: "contents" }}>
                  <div className="d-sm-flex align-items-center justify-content-center mb-4">
                    <h1 className="h3 mb-0 text-gray-800" style={{ textAlign: "center" }}>
                      Dashboard
                    </h1>
                  </div>

                  <div className="row" style={{ justifyContent: "center" }}>
                    {/* Earnings (Total) Card */}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                Earnings (Total)
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                ₹{totalEarnings}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fas fa-calendar fa-2x text-gray-300"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Total Orders Card */}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div
                        className="card border-left-warning shadow h-100 py-2"
                        onClick={handleShowTotalOrders}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Total Orders
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {orders.length || 0}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fa-solid fa-cart-shopping fa-2x"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Orders Preparing Button */}
                    <div className="col-xl-3 col-md-6 mb-4">
                      <div
                        className="card border-left-warning shadow h-100 py-2"
                        onClick={handleShowPreparingOrders}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="card-body">
                          <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                              <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                Orders Preparing
                              </div>
                              <div className="h5 mb-0 font-weight-bold text-gray-800">
                                {preparingOrders.length || 0}
                              </div>
                            </div>
                            <div className="col-auto">
                              <i className="fa-solid fa-cart-shopping fa-2x"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Show preparing orders if button clicked */}
                  {showPreparingOrders && (
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                              Preparing Orders Overview
                            </h6>
                          </div>
                          <div className="card-body">
                            {preparingOrders.length > 0 ? (
                              preparingOrders.map((order) => (
                                <div className="card mb-3" key={order._id}>
                                  <div className="row no-gutters">
                                    <div className="col-md-4" style={{ alignSelf: "center" }}>
                                      <img
                                        src={order.image}
                                        className="card-img"
                                        alt="Product"
                                      />
                                    </div>
                                    <div className="col-md-8">
                                      <div className="card-body">
                                        <div className="flex justify-between">
                                          <h5 className="card-title">{order.name}</h5>
                                          {/* Dropdown for status change */}
                                          <div className="relative inline-block text-left">
                                            <button
                                              type="button"
                                              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                                              onClick={() => toggleDropdown(order._id)}
                                            >
                                              Actions
                                              <svg
                                                className="-mr-1 ml-2 h-5 w-5"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.937a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </button>

                                            {openDropdown === order._id && (
                                              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                                <div className="py-1">
                                                  {["Order placed", "Being prepared", "Ready for pickup", "Delivered"].map((status) => (
                                                    <button
                                                      key={status}
                                                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                                      onClick={() => handleStatusChange(order._id, status)}
                                                    >
                                                      {status}
                                                    </button>
                                                  ))}
                                                </div>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                        <p className="card-text">Price: ₹{order.price}</p>
                                        <p className="card-text">Quantity: {order.quantity}</p>
                                        <p className="card-text">Status: {selectedStatus[order._id] || order.status}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No orders are currently preparing.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show total orders if button clicked */}
                  {showTotalOrders && (
                    <div className="row" style={{ justifyContent: "center" }}>
                      <div className="col-xl-8 col-lg-7">
                        <div className="card shadow mb-4">
                          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">
                              Total Orders Overview
                            </h6>
                          </div>
                          <div className="card-body">
                            {orders.length > 0 ? (
                              orders.map((order) => (
                                <div className="card mb-3" key={order._id}>
                                  <div className="row no-gutters">
                                    <div className="col-md-4" style={{ alignSelf: "center" }}>
                                      <img
                                        src={order.image}
                                        className="card-img"
                                        alt="Product"
                                      />
                                    </div>
                                    <div className="col-md-8">
                                      <div className="card-body">
                                        <h5 className="card-title">{order.name}</h5>
                                        <p className="card-text">Price: ₹{order.price}</p>
                                        <p className="card-text">Quantity: {order.quantity}</p>
                                        <p className="card-text">Status: {order.status}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p>No orders found.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}{/* Additional Content */}
                  <div className="row" style={{ justifyContent: "center" }}>
                    <div className="col-lg-6 mb-4">
                      <div className="card shadow mb-4">
                        <div className="card-header py-3">
                          <h6 className="m-0 font-weight-bold text-primary">
                            Add New Items
                          </h6>
                        </div>
                        <div className="card-body">
                          <div className="text-center">
                            <img
                              className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                              style={{ width: "25rem" }}
                              src={AddItemImg}
                              alt="Add Items"
                            />
                          </div>
                          <p>Add New Food Items and Categories to explore</p>
                          <a target="_blank" rel="nofollow" href="/admin/add-items">
                            Browse Add Items &rarr;
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <ErrorPage/>
      )}
    </>
  );
}

export default AdminDashboard;
