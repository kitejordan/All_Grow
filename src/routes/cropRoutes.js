const express = require('express');
const {addCrop,getAllCrops,getCropsByFarmer,searchCrops} = require('../controllers/cropController');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add',protect,addCrop);
router.get('/all',getAllCrops);
router.get('/my-crops',protect,getCropsByFarmer);
router.get('/search',searchCrops);

module.exports = router;