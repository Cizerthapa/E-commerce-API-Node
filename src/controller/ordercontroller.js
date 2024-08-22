// src/controllers/carController.js
import { body, validationResult } from 'express-validator';
import Order from './../../model/order.js'; // path is correct

export const createorder = async (req, res, next) => {
    try {
        // Validate input fields
        await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
        await body('orderid').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create and save order
        const { orderid ,stock , model  } = req.body;
        const order = new Order({ orderid ,stock , model });
        await order.save();
        res.status(201).json({ message: 'Order registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'order registration failed', message: error.message });
    }
};

export const getorder = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ message: 'product retrieved successfully', orders });
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to retrieve products', message: error.message });
    }
};

export const updateorder = async (req, res, next) => {
    try {
        // Validate input fields
        await body('stock').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);
        await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
        await body('newmodel').isLength({ min: 2 }).withMessage('New model must be at least 2 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Update car
        const { model, newmodel } = req.body;
        let product = await Product.findOneAndUpdate(
            { model, stock },
            { model: newmodel },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        } else {
            return res.status(200).json({ message: 'product updated successfully', product });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteorder = async (req, res, next) => {
    try {
        // Validate input fields
        await body('stock').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
        await body('model').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Delete order
        const { stock, model } = req.body;
        const product = await Product.findOneAndDelete({ stock, model });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Delete failed', message: error.message });
    }
};

export const deleteorderbyId = async (req, res, next) => {
    try {
        // Validate input fields
        await body('id').isLength({ min: 5 }).withMessage('ID must be at least 5 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Delete car by ID
        const { id } = req.body;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Delete failed', message: error.message });
    }
};