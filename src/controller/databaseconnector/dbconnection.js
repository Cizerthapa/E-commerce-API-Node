import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { addToProdDB, addToUserDB } from './../../controller/databasecontroller/databaseseeder.js';
import events from 'events';
import User from './../../model/user.js';
import Product from './../../model/product.js';

dotenv.config();

// Increase the maximum number of listeners for EventEmitter to avoid warnings
events.EventEmitter.defaultMaxListeners = 20;

const connectDB = async (url) => {
    try {
        const uri = url;
        if (!uri) {
            throw new Error('MONGO_URL is not defined in .env file');
        }

        await mongoose.connect(uri);

        console.log('Database connected successfully');

        // Check if User collection is empty, then seed it
        if (await User.countDocuments() === 0) {
            await addToUserDB();
            console.log('User Database seed ran successfully');
        }

        // Check if Product collection is empty, then seed it
        if (await Product.countDocuments() === 0) {
            await addToProdDB();
            console.log('Product Database seed ran successfully');
        }
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};

export default connectDB;
