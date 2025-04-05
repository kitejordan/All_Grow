const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({      // Schema for crops collection
    farmer:{
        type : mongoose.Schema.Types.ObjectId,     // Reference to User model
        ref: 'User',                                //foreign key
        required: true
    },

    name : {
        type: String,
        required: true 
    },

    quantity : {
        type : Number,
        required: true
    },

    basePrice : {
        type : Number,
        required: true
    },

    desciption : {
        type : String,
    },
    biddingOpen : {
        type : Boolean,
        default: false
    },
    highestBid :{
        type: Number,
        default: null
    },
    highestBidder: {
        type: mongoose.Schema.Types.ObjectId,           // Reference to User model
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available'
    },
    
    createdAt: {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Crop',cropSchema);