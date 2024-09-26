import React from 'react';
import { useUser } from '../userContext';

const OrderConfirmation = ({ orderDetails, orderId }) => {
  const {user}= useUser();
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">Order Confirmation</h5>
      </div>
      <div className="card-body">
        <h6 className="card-title">Thank you for your order!</h6>
        <p className="card-text">Your order has been successfully placed with the following details:</p>
        <ul>
          {orderDetails.map((item) => (
            <li key={item._id}>
              <strong>{item.item_title}</strong> - Quantity: {item.quantity} - Total: ₹{(item.item_price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <p>Your Order ID(s): {orderId}</p>
        <p>You will receive your order confirmation shortly. Please keep this information for your records.</p>
        <p>Your OTP has been sent to your mail {user.email}</p>
        <a href={`/verify_otp/${orderId}`}><p>Click here to go to verify page</p></a>
      </div>
    </div>
  );
};

export default OrderConfirmation;
