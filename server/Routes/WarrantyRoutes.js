const express = require("express");
const { ClaimWarranty } = require("../Controllers/ClaimWarrantyController");
const router = express.Router();


router.post("/claim-warranty", ClaimWarranty);


 
module.exports = router;