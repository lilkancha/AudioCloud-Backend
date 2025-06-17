// server/routes/payments.js
import Razorpay from 'razorpay';
import express from 'express';

const router = express.Router();

// initialize with both ID and SECRET:
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,  // set this in your server .env
});

router.post('/create-order', async (req, res) => {
  console.log(req.body);
  
  const { amount } = req.body; 
  
  console.log("amount", amount);
  
  try {
    const order = await razorpay.orders.create({
        amount,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`
    });
    console.log("order", order);
    
    res.json(order);    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to create order' });
  }
});

export default router;

