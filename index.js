const express = require('express');
const { default: mongoose } = require('mongoose');

mongoose.connect("mongodb+srv://garvitjain527:garvitjain@sstclasses.tswcqic.mongodb.net/?appName=sstClasses").then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
});

const app = express();
app.use(express.json())

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    isInStock: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
});

const productModel = mongoose.model("products", productSchema);

app.get("/api/products", async(req, res) => {
    const products = await productModel.find();

    console.log(products);

    return res.status(200).json(products);
})

app.post("/api/products", async(req, res) => {
    const product = productModel.create({
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        isInStock: req.body.isInStock,
        category: req.body.category,
    })

    console.log(product);

    return res.status(201).json({message: "Product Created"});
})

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});