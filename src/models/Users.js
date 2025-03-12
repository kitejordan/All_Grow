const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({           //Schema of the user
    name : {type: String, required: true},

    email : {type: String, required: true, unique: true},

    password : {type: String, required: true},

    role : {type: String, enum: ["farmer","fmcg"],required: true},

}, {timestamps: true});


UserSchema.pre('save', async function(next){             // Encrypt before saving
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);               // 10 rounds of hashing of random string salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
}
);

module.exports = mongoose.model('User', UserSchema);
