const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const packageRoutes = require('./routes/packageRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
const mongoURI = "mongodb://dhananjay33:dhananjay33@cluster0-shard-00-00.rcier.mongodb.net:27017,cluster0-shard-00-01.rcier.mongodb.net:27017,cluster0-shard-00-02.rcier.mongodb.net:27017/?ssl=true&replicaSet=atlas-ewakvf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
