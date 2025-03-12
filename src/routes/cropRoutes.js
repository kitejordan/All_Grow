const express = require('express');
const {addCrop,getAllCrops,getCropsByFarmer} = require('../controllers/cropController');
const {protect} = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/add',protect,addCrop);
router.get('/all',protect,getAllCrops);
router.get('/my-crops',protect,getCropsByFarmer);

module.exports = router;