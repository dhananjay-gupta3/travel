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
router.delete('/api/admin/packages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) { return res.status(404).json({ message: 'Package not found' }); }
        res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting package' });
    }
});

module.exports = router;
