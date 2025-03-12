const Crop = require('../models/Crop.js');
const User = require('../models/Users.js');

exports.addCrop = async (req,res)=> {
    try{
        const {name,quantity,basePrice,description} = req.body;

        if(req.user.role !== 'farmer') return res.status(403).json({message: 'Not authorized as you are not a farmer'});

        const crop = new Crop({
            farmer: req.user._id,
            name,
            quantity,
            basePrice,
            description
        });

        await crop.save();
        res.status(201).json({message: 'Crop added successfully'});

    }
    catch(err){
        res.status(500).json({message: 'Error in adding crop'});
    }
};

exports.getAllCrops = async (req,res) => {
    try{
        const crops = await Crop.find().populate('farmer','name email');
        res.status(200).json(crops);
    }
    catch(error){
        res.status(500).json({message: 'Error in fetching crops (all)'});
    }
};

exports.getCropsByFarmer = async (req,res) =>{
    try{
        if(req.user.role != 'farmer'){
            return res.status(403).json({message: 'Not authorized - only farmer can view their crops'});
        }

        const crops = await Crop.find({farmer: req.user._id});
        res.status(200).json(crops);
    }
    catch(error){
        res.status(500).json({message: 'Error in fetching crops (farmer)'});
    }
};