// src/model/order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderid: Number,
    stock: Number,
    model: String
});

const Order = mongoose.model('Order', orderSchema);

export default Order; // Make sure to export as default