const express = require('express');
const {startBidding, placeBid, closeBidding } = require('../controllers/bidController');
const {protect} = require('../middlewares/authMiddleware');


const router = express.Router();

router.post('/start/:cropId', protect, startBidding);          // Route to start bidding for a crop
router.post('/place/:cropId', protect, placeBid);           // Route to place a bid on a crop
router.post('/close/:cropId', protect, closeBidding);       // Route to close bidding for a crop

module.exports = router; 