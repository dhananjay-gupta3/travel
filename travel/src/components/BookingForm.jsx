import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import './BookingForm.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        numberOfTravelers: '',
        specialRequests: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to backend)
        console.log('Form submitted:', formData);
        generatePDF();
        navigate('/'); // Redirect to homepage
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Booking Invoice", 20, 20);
        doc.text(`Name: ${formData.name}`, 20, 30);
        doc.text(`Email: ${formData.email}`, 20, 40);
        doc.text(`Phone Number: ${formData.phoneNumber}`, 20, 50);
        doc.text(`Number of Travelers: ${formData.numberOfTravelers}`, 20, 60);
        doc.text(`Special Requests: ${formData.specialRequests}`, 20, 70);
        doc.save("booking_invoice.pdf");
    };

    return (
        <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
                <h1>Book Your Package</h1>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Number of Travelers:</label>
                    <input type="number" name="numberOfTravelers" value={formData.numberOfTravelers} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Special Requests (Optional):</label>
                    <textarea name="specialRequests" value={formData.specialRequests} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
    );
};

export default BookingForm;
