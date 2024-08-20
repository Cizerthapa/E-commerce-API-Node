import Product from './../../model/product.js';
import User from './../../model/user.js';

// Seeder function for adding products to the database
export const addToProdDB = async () => {
    try {
        const products = [
            { model: 'Model A', brand: 'Brand X', price: 100, stock: 10 },
            { model: 'Model B', brand: 'Brand Y', price: 150, stock: 20 },
            // Add more product objects as needed
        ];

        await Product.insertMany(products);
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Product seeding failed:', error.message);
    }
};

// Seeder function for adding users to the database
export const addToUserDB = async () => {
    try {
        const users = [
            { username: 'user1', email: 'user1@example.com', password: 'password1' },
            { username: 'user2', email: 'user2@example.com', password: 'password2' },
        ];

        await User.insertMany(users);
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('User seeding failed:', error.message);
    }
};
