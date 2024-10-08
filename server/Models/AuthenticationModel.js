const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    otp: {
        type: String 
    },
    otpExpiresAt: {
        type: Date
    },
    warranty: [{
        purchaseDate: {
            type: Date,
            required: true
        },
        warrantyPeriod: {
            type: Date,
            required: true  
        },
        purchaseAddress: {
            type: String,
            required: true
        }
    }]

}, {timestamps: true});

module.exports = mongoose.model("User", UserSchema);
