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

  totalAmount:{
    type:Number,
    required:true
  },
  
  status:{
    type:String,
    default:"Placed"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Order", OrderSchema);
