const route = require("express").Router();
const Order = require("../model/Order");

const User = require("../model/User");
const  sendMail  = require("../utils/sendMail");

route.post("/create", async (req, res) => {

  try {

    const { items, totalAmount, userId } = req.body;

    const formattedItems = items.map(item => ({
      productId: item._id,
      name: item.name,
      price: item.price,
      qty: item.qty
    }));

    const order = new Order({
      userId,
      items: formattedItems,
      totalAmount,
      status: "Placed"
    });

    await order.save();

    const user = await User.findById(userId);

    if (user) {
      await sendMail(
        user.email,
        "Order Placed",
        `Hi ${user.firstName},

        Your order of ₹${totalAmount} has been placed successfully 

        We will notify you when it is shipped Thank you `
      );
    }

    res.status(201).json({ message: "Order stored in DB" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});



route.get("/user/:userId", async (req, res) => {
  try {

    const userId = req.params.userId;

    const orders = await Order.find({ userId: userId });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

route.get("/all", async (req, res) => {
  try {

    const orders = await Order.find();

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


route.put("/update-status/:id", async (req, res) => {
  try {
    const {status} = req.body;

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    const user = await User.findById(order.userId);

    if (user) {
      if(status === "Shipping"){
        await sendMail(
          user.email,
          "Order Shipped",
          `Hi ${user.firstName},
          Your order of ₹${order.totalAmount} has been shipped
          We will notify you when it is out for delivery Thank you `
        );
      }
      if(status === "Delivered"){
        await sendMail(
          user.email,
          "Order Delivered",
          `Hi ${user.firstName},
          Your order of ₹${order.totalAmount} has been delivered
          Thank you for shopping with us! `
        );
      }
      if(status==="Pending"){
        await sendMail(
          user.email,
          "Order Pending",
          `Hi ${user.firstName},
          Your order of ₹${order.totalAmount} is now pending
          We will notify you when there is an update Thank you `
        );
      }



    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});





module.exports = route;
