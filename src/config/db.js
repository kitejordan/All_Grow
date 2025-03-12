const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async() => {
try{
    await mongoose.connect('mongodb://127.0.0.1:27017/all_grow');
    console.log('Connection Established');
} catch (error){
    console.error('Database connection failed');
    console.log(error);
    process.exit(1);
}
};


module.exports = connectDB;