// src/model/product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    model: String,
    brand: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model('Product', productSchema);

export default Product; // Make sure to export as default
