const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = "mongodb://dhananjay33:dhananjay33@cluster0-shard-00-00.rcier.mongodb.net:27017,cluster0-shard-00-01.rcier.mongodb.net:27017,cluster0-shard-00-02.rcier.mongodb.net:27017/?ssl=true&replicaSet=atlas-ewakvf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
