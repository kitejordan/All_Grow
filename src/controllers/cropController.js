const Crop = require('../models/Crop.js');
const User = require('../models/Users.js');

exports.addCrop = async (req,res)=> {           //add crop
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

exports.getAllCrops = async (req,res) => {                  //get all crops
    try{
        const crops = await Crop.find().populate('farmer','name email');
        res.status(200).json(crops);
    }
    catch(error){
        res.status(500).json({message: 'Error in fetching crops (all)'});
    }
};

exports.getCropsByFarmer = async (req,res) =>{              //get crops of logged in farmer
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

exports.searchCrops = async (req,res) => {                      //search crops based on name, minPrice, maxPrice
    try{
        const {name, minPrice, maxPrice} = req.query;           //extract from query string
        let query = {};                                         //new empty object

        if(name) {
            query.name = {$regex: new RegExp(name,"i")};            //case-insensitive search
        }

        // Ensure minPrice and maxPrice are valid numbers
        if (!isNaN(minPrice) && minPrice.trim() !== "") {           //check if minPrice is provided and is a valid number
            query.basePrice = { $gte: Number(minPrice) };
        }
        if (!isNaN(maxPrice) && maxPrice.trim() !== "") {                         //check if maxPrice is provided and is a valid number
            query.basePrice = { ...query.basePrice, $lte: Number(maxPrice) };
        }
            
        const crops = await Crop.find(query);
        res.json(crops);
    } 
    catch(error){
        res.status(500).json({message: 'Error in searching crops'});
    }
};