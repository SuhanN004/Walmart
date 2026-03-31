const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  image: {
    type: String

  },

  description: {
    type: String,
    required: true
  },

  category:{
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Items", ProductSchema);