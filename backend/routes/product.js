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



route.post("/add", upload.single("image"), async (req, res) => {
    try {

        const { name, price, stock, description, category } = req.body;

        const productData = new Product({
            name,
            price,
            stock,
            description,
            category,
            image: req.file ? req.file.filename : null
        });

        const product = await productData.save();

        res.status(201).json(product);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



route.get("/view", async (req, res) => {
    try {

        const products = await Product.find();
        res.json(products);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



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



route.delete("/delete/:id", async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



route.put("/update/:id", upload.single("image"), async (req, res) => {
    try {

        const { name, price, stock, description, category } = req.body;

        let updatedData = {
            name,
            price,
            stock,
            description,
            category
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