const Crop = require('../models/Crop');           
const Bid = require('../models/Bid');             

exports.startBidding = async(req,res) => {                //start bidding for a crop
    try{
        const {cropId} = req.params;
        const crop = await Crop.findById(cropId);

        if(!cropId) return res.status(400).json({message: 'Crop not found'});
        if(crop.farmer.toString() !== req.user.id) return res.status(403).json({message: 'Not authorized to start bidding for this crop'});

        crop.biddingOpen = true;                //set biddingOpen to true
        await crop.save();

        res.status(200).json({message: 'Bidding started successfully'});
    } catch(error){
        res.status(500).json({message: 'Error in starting bidding'});
    }
};


exports.placeBid = async (req,res) => {                 //place a bid on a crop
    try{
        const {cropId} = req.params;
        const {amount} = req.body;

        const crop = await Crop.findById(cropId);

        if(!crop || !crop.biddingOpen) return res.status(400).json({message: 'Bidding is not open for this crop'});

        if(req.user.role !== 'fmcg')  return res.status(403).json({message: 'Only FMCG can place bids'});

        if(amount <= crop.basePrice || (crop.highestBid && amount <=crop.highestBid))               //check if amount is greater than base price and highest bid
             return res.status(400).json({message: 'Bid amount must be greater than base price'});

        const bid = await Bid.create({crop: cropId, bidder: req.user._id, amount});                  //create new bid

        crop.highestBid = amount;
        crop.highestBidder = req.user._id;

        await crop.save();

        res.status(201).json({message: 'Bid placed successfully', bid});

    } catch(error){
        res.status(500).json({message: 'Error in placing bid'});
    }
};

exports.closeBidding = async (req,res) =>{                               //close bidding for a crop(only farmer can do this)
    try{
        const {cropId} = req.params;
        const crop = await Crop.findById(cropId).populate("highestBidder", "name email");      


        if(!crop) return res.status(400).json({message: 'Crop not found'});
        if(crop.farmer.toString() !== req.user.id) return res.status(403).json({message: 'Not authorized to close bidding for this crop'});

        if(!crop.highestBidder)
            return res.status(400).json({message: 'No bids placed for this crop'});

        crop.biddingOpen = false;                       //set biddingOpen to false
        crop.status = 'sold';                           //set status to sold
        await crop.save();

        res.status(200).json({message: 'Bidding closed successfully', winner: crop.highestBidder
            ,highestBid: crop.highestBid});

    } catch(error){
        res.status(500).json({message: 'Error in closing bidding'});
    }
};
