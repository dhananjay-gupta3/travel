const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Package = require('../models/package');
const { generateInvoiceHTML, generateInvoicePDF } = require('../invoice');

// Submit a booking
router.post('/', async (req, res) => {
    const { name, email, phone, travelers, specialRequests, packageId } = req.body;
    const pkg = await Package.findById(packageId);

    if (!pkg) {
        return res.status(404).json({ message: 'Package not found' });
    }

    const totalPrice = pkg.price * travelers;
    const booking = new Booking({ name, email, phone, travelers, specialRequests, packageId, totalPrice });
    await booking.save();

    // Generate invoice HTML
    const invoiceHTML = generateInvoiceHTML(booking, pkg);
    // Generate PDF (optional)
    await generateInvoicePDF(invoiceHTML, booking._id);

    res.json({ message: 'Booking successful', booking });
});

// Fetch all bookings (Admin)
router.get('/', async (req, res) => {
    const bookings = await Booking.find().populate('packageId');
    res.json(bookings);
});

module.exports = router;
