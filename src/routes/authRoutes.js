const express = require('express');
const {registerUser, loginUser} = require('../controllers/authController');

const router = express.Router();



router.post('/register', registerUser);    //router for register endpoint
router.post('/login', loginUser);       //router for login endpoint

module.exports = router;