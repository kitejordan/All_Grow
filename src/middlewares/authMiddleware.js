const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {    //check if token is provided
        token = req.headers.authorization.split(' ')[1];                                 //extract token from header

        try{
            const decoded = jwt.verify(token,process.env.JWT_SECRET);               //verify token (decoded = payload of token which contains user info)
            req.user = await User.findById(decoded.id).select('-password');             //find user by id and exclude password
            next();
        } 
        catch(error){
            console.error(error);
            res.status(401).json({message: 'Not authorized, token failed'});
        }

    } else res.status(401).json({message: 'No token provided'});
    
}