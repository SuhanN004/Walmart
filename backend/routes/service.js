const route = require("express").Router();
const Service = require("../model/Service");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });




route.post("/add", upload.single("image"), async (req, res) => {

  try {

    const { title } = req.body;

    const serviceData = new Service({
      title,
      image: req.file ? req.file.filename : null
    });

    const service = await serviceData.save();

    res.status(201).json(service);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});




route.get("/view", async (req, res) => {

  try {

    const services = await Service.find();

    res.json(services);

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

});

module.exports = route;