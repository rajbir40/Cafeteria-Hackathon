const nodemailer = require("nodemailer");
const Order = require("../models/order")
const User = require("../models/user")
const crypto = require("crypto");
const express = require("express");

const router = express.Router();
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};


    router.post("/order/:Id/status",async (req,res) => {

    const {Id} = req.params;
    const {newstatus} = req.body;

    const validStatuses = ["Order placed", "Being prepared", "Ready for pickup", "Delivered"];

    if(!validStatuses.includes(newstatus)){
        return res.status(400).json({message:"invalid status"})
    }

    try{
        const order = await Order.findById(Id);
        if(!order || !order.status){
            return res.status(404).json({ message: "Order not found" });
        }
        order.status = newstatus;
        await order.save();
        res.status(200).json({ message: "Order status updated" });
    }
    catch(err){
        res.status(500).json({ message: "Error updating order status", error: err });
    }
    
  })

  module.exports = router;


  