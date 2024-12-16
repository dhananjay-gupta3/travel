// seed/seedPackages.js
const mongoose = require('mongoose');
const connectDB = require('../db');
const Package = require('../models/package');

// Sample tour packages
const tourPackages = [
    {
        title: 'Beach Paradise',
        description: 'Enjoy a serene getaway to pristine beaches.',
        price: 500,
        availableDates: ['2024-01-15', '2024-02-10', '2024-03-05'],
        image: 'https://example.com/images/beach.jpg',
    },
    {
        title: 'Mountain Adventure',
        description: 'Experience thrilling mountain hiking and camping.',
        price: 750,
        availableDates: ['2024-02-20', '2024-03-15'],
        image: 'https://example.com/images/mountain.jpg',
    },
    {
        title: 'City Lights',
        description: 'Explore the vibrant city life and cultural landmarks.',
        price: 300,
        availableDates: ['2024-03-01', '2024-04-05'],
        image: 'https://example.com/images/city.jpg',
    },
];

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Package.deleteMany({});
        console.log('Existing tour packages cleared.');

        // Insert new data
        await Package.insertMany(tourPackages);
        console.log('Tour packages seeded successfully.');

        process.exit(); // Exit the script
    } catch (err) {
        console.error('Error seeding data:', err.message);
        process.exit(1); // Exit with failure
    }
};

seedData();
