import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './controller/routes/auth.js';
import connectDB from './controller/databaseconnector/dbconnection.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT;

if(PORT == null){
    console.error('PORT is not defined');
    process.exit(1); // exit early
}

const MONGO_URI = process.env.MONGO_URL;

if(MONGO_URI == null){
    console.error('MONGO_URI is not defined');
    process.exit(1); // exit early
}

try {
    connectDB(MONGO_URI);
} catch (e) {
    console.error('Error connecting:', e.message);
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});