// src/routes/carRoute.js
import express from 'express';
import { createproduct, getproduct, deleteproduct, deleteproductbyId, updateproduct } from '../controller/databasecontroller/productcontroller.js';
import verifyToken from './controller/middleware/authMiddleware.js';

const router = express.Router();

// Middleware for validating text fields
router.get('/', getproduct);
router.post("/postproduct", verifyToken, createproduct);
router.delete("/deleteproduct", verifyToken, deleteproduct);
router.delete('/deleteproductbyid', verifyToken, deleteproductbyId);
router.put('/productupdate', verifyToken, updateproduct);

export default router; // Use export default