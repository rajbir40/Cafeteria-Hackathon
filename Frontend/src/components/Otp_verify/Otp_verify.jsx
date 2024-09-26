import React, { useState} from 'react';
import { useUser } from '../userContext';

export default function OtpVerify({ order }) {
  const {otp} = order;
  const {user} = useUser();
  const [inotp,setInotp]= useState();
  

  const handleOtpChange = (e) => {
    setInotp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inotp === otp) {
      window.location.href = '/menu';
      console.log("OTP is correct.");
    } else {
      console.log("Invalid OTP.");
    }
  };

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your email {user.email}</p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    <div className="w-100 h-16">
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        onChange={handleOtpChange} // Event handler for input change
                        placeholder="Enter OTP"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div className='flex justify-center items-center'>
                      <button
                        type="submit" // Set the button type to submit for form submission
                        className="w-40 h-10 flex flex-row items-center justify-center text-center  border rounded-xl outline-none py-2 bg-blue-700 border-none text-white text-sm shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
