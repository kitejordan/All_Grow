const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/token_gen');

exports.registerUser = async (req,res) => { //Register User

    const {name, email, password, role} = req.body;
    
    try{
        const userExists = await User.findOne({email});           // check if user already exist

        if(userExists) return res.status(400).json({message: 'User already exists'});     //throws error is exists

        const user = await User.create({name,email,password,role});                       //creates new user

        res.status(201).json({                  // send json response with newly created user details to server
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });

    } catch (error){
        res.status(500).json({message: 'Server Error'});
    }
};




exports.loginUser = async (req,res) => {            //Login User
    const {email, password} = req.body;             //get email and password from request body      

    try{
        const user = await User.findOne({email});                                         // check if user already exist
        if(!user) return res.status(400).json({message: 'Invalid Credentials'});          //throws error is no email found

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'Invalid Credentials'});        //throws error if password is incorrect
    
        res.json({
            _id: user._id,
            name: user.name,
            email:user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } catch(error){
        res.status(500).json({message: 'Server Error'});                    //error in token generation
    }
};