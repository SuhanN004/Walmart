const route = require("express").Router();

require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

route.post("/create-payment", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, 
      currency: "inr",
    });

    

    res.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Payment failed" });
  }
});

module.exports = route;