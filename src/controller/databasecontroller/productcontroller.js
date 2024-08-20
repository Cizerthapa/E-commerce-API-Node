// src/controllers/carController.js
import { body, validationResult } from 'express-validator';
import Product from './../../model/product.js'; // path is correct

export const createproduct = async (req, res, next) => {
    try {
        // Validate input fields
        await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
        await body('brand').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Create and save car
        const { model, brand, price, stock  } = req.body;
        const product = new Product({ model, brand, price, stock });
        await product.save();
        res.status(201).json({ message: 'Product registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed', message: error.message });
    }
};

export const getproduct = async (req, res, next) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'product retrieved successfully', products });
    } catch (error) {
        next(error);
        res.status(500).json({ error: 'Failed to retrieve products', message: error.message });
    }
};

export const updateproduct = async (req, res, next) => {
    try {
        // Validate input fields
        await body('brand').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);
        await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
        await body('newmodel').isLength({ min: 2 }).withMessage('New model must be at least 2 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Update car
        const { model, newmodel, brand } = req.body;
        let product = await Product.findOneAndUpdate(
            { model, brand },
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

export const deleteproduct = async (req, res, next) => {
    try {
        // Validate input fields
        await body('model').isLength({ min: 2 }).withMessage('Model must be at least 2 characters long').run(req);
        await body('brand').isLength({ min: 2 }).withMessage('Brand must be at least 2 characters long').run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Delete car
        const { model, brand } = req.body;
        const car = await Car.findOneAndDelete({ model, brand });
        if (!car) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Delete failed', message: error.message });
    }
};

export const deleteproductbyId = async (req, res, next) => {
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