const route = require("express").Router();
const User = require("../model/User");



route.post("/check-email", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    res.json({ exists: !!user });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});



route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.json({
      message: "Login successful",
      user: user
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});



route.post("/signup", async (req, res) => {
  try {
    const { email, phone } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    const newUser = await User.create(req.body);

    res.json({
      message: "Account created successfully",
      user: newUser
    });

  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Error creating account" });
  }
});


route.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});



route.get("/user/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = route;