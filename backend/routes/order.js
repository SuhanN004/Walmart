const route = require("express").Router();
const Order = require("../model/Order");

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
      totalAmount
    });

    await order.save();

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


module.exports = route;
