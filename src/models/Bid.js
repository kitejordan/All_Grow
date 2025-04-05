const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    crop:{
        type: mongoose.Schema.Types.ObjectId,           // Reference to Crop model
        ref: 'Crop',
        required: true
    },
    bidder:{
        type: mongoose.Schema.Types.ObjectId,           // Reference to User model
        ref: 'User',
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
},{timestamps: true});

module.exports = mongoose.model('Bid',bidSchema);  