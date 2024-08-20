// src/routes/carRoute.js
import express from 'express';
import { createorder, getorder, deleteorder, deleteorderbyId, updateorder } from './../../controller/databasecontroller/ordercontroller.js';
import verifyToken from './../../controller/middleware/authMiddleware.js';

const router = express.Router();

// Middleware for validating text fields
router.get('/', getorder);
router.post("/postorder", verifyToken, createorder);
router.delete("/deleteorder", verifyToken, deleteorder);
router.delete('/deleteorderbyid', verifyToken, deleteorderbyId);
router.put('/orderupdate', verifyToken, updateorder);

export default router; // Use export default