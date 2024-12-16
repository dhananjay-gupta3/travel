const express = require('express');
const router = express.Router();
const Package = require('../models/package');
const authenticate = require('../middleware/authenticate');


// Fetch all tour packages
router.get('/', async (req, res) => {
    const packages = await Package.find();
    res.json(packages);
});

// Fetch a specific tour package by ID
router.get('/:id', async (req, res) => {
    const pkg = await Package.findById(req.params.id);
    res.json(pkg);
});

// Admin - Add a new package
router.post('/', authenticate, async (req, res) => {
    const pkg = new Package(req.body);
    await pkg.save();
    res.json(pkg);
});

// Admin - Update an existing package
router.put('/:id', authenticate, async (req, res) => {
    const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(pkg);
});

// Admin - Delete a package
router.delete('/:id', authenticate, async (req, res) => {
    await Package.findByIdAndDelete(req.params.id);
    res.json({ message: 'Package deleted' });
});

module.exports = router;
