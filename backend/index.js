const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const serviceRoutes = require("./routes/service");
const paymentRoutes = require("./routes/payment");

const app = express();
const PORT = process.env.PORT || 5000;


// app.use(cors({
// origin: process.env.CLIENT_URL,
// credentials: true
// }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static('uploads'));


app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/payment", paymentRoutes);


app.get("/", (req, res) => {
res.send("Backend is running ");
});


mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Error:", err));


app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
