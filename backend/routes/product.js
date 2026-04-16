const route = require("express").Router();
const Product = require("../model/Product");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });


// 🔥 ADD PRODUCT
route.post("/add", upload.single("image"), async (req, res) => {
    try {

        const { name, price, stock, description, category, features } = req.body;

        const productData = new Product({
            name,
            price,
            stock,
            description,
            category,

            // ✅ HANDLE FEATURES ARRAY
            features: features ? JSON.parse(features) : [],

            image: req.file ? req.file.filename : null
        });

        const product = await productData.save();

        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// VIEW ALL
route.get("/view", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// VIEW SINGLE
route.get("/:id", async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// DELETE
route.delete("/delete/:id", async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 🔥 UPDATE PRODUCT (WITH FEATURES)
route.put("/update/:id", upload.single("image"), async (req, res) => {
    try {

        const { name, price, stock, description, category, features } = req.body;

        let updatedData = {
            name,
            price,
            stock,
            description,
            category,

            // ✅ UPDATE FEATURES
            features: features ? JSON.parse(features) : []
        };

        if (req.file) {
            updatedData.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        res.json(updatedProduct);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = route;