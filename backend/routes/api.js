const express = require('express');
const Package = require('../models/package');
const Booking = require('../models/booking');

const router = express.Router();

// Get all packages
router.get('/packages', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create new package (Admin)
router.post('/packages', async (req, res) => {
    const { title, description, price, availableDates, image } = req.body;
    const newPackage = new Package({ title, description, price, availableDates, image });
    try {
        await newPackage.save();
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Create booking
router.post('/book', async (req, res) => {
    const { name, email, phone, numOfTravelers, specialRequests, packageId } = req.body;
    const booking = new Booking({ name, email, phone, numOfTravelers, specialRequests, packageId });
    try {
        await booking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
