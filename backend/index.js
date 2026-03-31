const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const serviceRoutes = require("./routes/service");
const paymentRoutes = require("./routes/payment");

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static('uploads'));


app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/payment", paymentRoutes);


mongoose.connect("mongodb://127.0.0.1:27017/Products")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});