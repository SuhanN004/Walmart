const route = require("express").Router();
const Order = require("../model/Order");
const User = require("../model/User");
const sendMail = require("../utils/sendMail");



route.post("/create", async (req, res) => {
  try {
    const { items, totalAmount, userId } = req.body;

    
    if (!items || !totalAmount || !userId) {
      return res.status(400).json({ message: "Missing fields" });
    }

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

    console.log(" USER:", user);

    
    if (user && user.email) {
      try {
        await sendMail(
          user.email,
          "Order Placed",
          `Hi ${user.firstName},

Your order of ₹${totalAmount} has been placed successfully.

We will notify you when it is shipped.

Thank you `
        );
      } catch (mailErr) {
        console.log(" Mail failed:", mailErr);
      }
    } else {
      console.log(" User email not found");
    }

    res.status(201).json({ message: "Order stored in DB" });

  } catch (err) {
    console.log(" ORDER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});




route.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (err) {
    console.log(" FETCH USER ORDERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});




route.get("/all", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.log(" FETCH ALL ORDERS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});




route.put("/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status required" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const user = await User.findById(order.userId);

    console.log(" USER FOR STATUS:", user);

    if (user && user.email) {
      try {

        let subject = "";
        let message = "";

        if (status === "Shipping") {
          subject = "Order Shipped";
          message = `Hi ${user.firstName},

Your order of ₹${order.totalAmount} has been shipped.

We will notify you when it is out for delivery.

Thank you`;
        }

        if (status === "Delivered") {
          subject = "Order Delivered";
          message = `Hi ${user.firstName},

Your order of ₹${order.totalAmount} has been delivered.

Thank you for shopping with us `;
        }

        if (status === "Pending") {
          subject = "Order Pending";
          message = `Hi ${user.firstName},

Your order of ₹${order.totalAmount} is now pending.

We will notify you when there is an update.

Thank you `;
        }

        if (subject && message) {
          await sendMail(user.email, subject, message);
        }

      } catch (mailErr) {
        console.log(" Status Mail failed:", mailErr);
      }
    } else {
      console.log("User email not found for status update");
    }

    res.json(order);

  } catch (err) {
    console.log(" UPDATE STATUS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = route;