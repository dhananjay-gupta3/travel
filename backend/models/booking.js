const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelers: { type: Number, required: true },  // Ensure this field is required
    specialRequests: String,
    packageId: { type: mongoose.Schema.Types.ObjectId, required: true },
    totalPrice: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
