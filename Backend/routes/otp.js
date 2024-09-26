const Order = require("../models/order")
const express = require("express");

const router = express.Router();

router.post("/:Id/verifyotp",async (req,res)=>{

    const {Id} = req.params;
    const {verifyotp} = req.body;
    console.log(verifyotp);

    if(!verifyotp){
        return res.status(400).json({message:"otp not found"})
    }

    try{
        const order = await Order.findById(Id);
        if(!order || !order.otp){   
            return res.status(400).json({message:"Invalid OTP"})
        }
        const otp = order.otp;
        if(verifyotp!==otp){
            return res.status(400).json({message:"otp not matched or incorrect otp"})
        }
        else {
            console.log("otp verified successfully");
            return res.status(200).json({ message: "OTP verified successfully" });
        }
    }
    catch(err){
        res.status(500).send({ message: 'OTP not matched', error: err });
        return res.status(500).json({ message: "Error verifying OTP", error: err });
    }

})

module.exports = router;