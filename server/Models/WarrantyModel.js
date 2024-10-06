const mongoose = require("mongoose");

const WarrantySchema = new mongoose.Schema({
    
    productName: {
        type: String,
        required: true
    },
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

}, {timestamps: true});

module.exports = mongoose.model("Warranty", WarrantySchema)