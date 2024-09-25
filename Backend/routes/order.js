const nodemailer = require("nodemailer");
const Order = require("../models/order")
const User = require("../models/user")
const crypto = require("crypto");

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
}; 

router.post("/order/:Id/send-otp",async (req, res) => {

    const { Id } = req.params;

    try{

        const order = await Order.findById(Id);
        if(!order){
            return res.status(401).json({error:"Order not found"});
        }

        const userId = order.user;

        try{
            const user = await User.findById(userId);
            if(!user || user.email){
                return res.status(400).json({ message: "User or email not found" });
            }

            // Generate OTP 
            const otp = generateOTP();
            user.otp = otp;
            await user.save();

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: "rbir3438@gmail.com", // Your email
                    pass: "nifl uruh usub sxrr", // Your email's app-specific password
                },
            });

            const mailOptions = {
                from: 'rbir3438@gmail.com', // Replace with your email
                to: user.email, // User's email
                subject: 'Your OTP for Order Confirmation',
                text: `Your OTP for confirming your order is ${otp}. This OTP is valid for 5 minutes.`,
            };

            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'OTP sent to your email' });


        }
        catch(err){
            res.status(500).json({message:"euser not found"})
        }

    }
    catch (err) {
        res.status(500).send({ message: 'Error adding review', error: err });
      }

    // const { email} = req.body;
    // if (!email) {
    //   return res.status(400).json({ message: 'Email is required' });
    // }
  
    // try {
    //   const otp = generateOTP();
    //   const expiresAt = Date.now() + 300000; // OTP valid for 5 minutes
  
    //   const foundUser = await User.findOne({ email });
    //   if (!foundUser) {
    //     return res.status(400).json({ message: 'User Not Found' });
    //   }

    //   // Find user and update OTP
    //   foundUser.otp = otp;
    //   foundUser.expiredAt = new Date() + 600000;

    //   foundUser.save();
  
    //   const transporter = nodemailer.createTransport({
    //     host: "smtp.gmail.com",
    //     port: 587,
    //     secure: false, // true for port 465, false for other ports
    //     auth: {
    //       user: "rbir3438@gmail.com",
    //       pass: "nifl uruh usub sxrr",
    //     },
    //   });``
      

    //   const mailOptions = {
    //     from: 'rbir3438@gmail.com', // Replace with your email
    //     to: email,
    //     subject: 'Your OTP for Password Reset',
    //     text: `Your OTP for password reset is ${otp}. This OTP is valid for 10 minutes.`,
    //     user:{

    //     }
    //   };
  
    //   await transporter.sendMail(mailOptions);
    //   res.status(200).json({ message: 'OTP sent to your email' });
    // } catch (error) {
    //   console.error('Error sending email:', error);
    //   res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
    // }
  })


  