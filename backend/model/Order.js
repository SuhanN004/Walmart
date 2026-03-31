const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({

  userId: {
    type: String,
    required: true
  },

  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],

  totalAmount: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", OrderSchema);
