const express = require('express');
const router = express.Router();
const Package = require('../models/package');
const authenticate = require('../middleware/authenticate');

// Add a new package
router.post('/packages', authenticate, async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request body
        const pkg = new Package(req.body);
        await pkg.save();
        res.json(pkg);
    } catch (error) {
        console.error('Error:', error.message); // Log the error message
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
