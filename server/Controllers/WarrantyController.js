const WarrantySchema = require("../Models/WarrantyModel");


const claimWarranty = (req, res) => {
    const { productName, purchaseDate, warrantyPeriod, purchaseAddress } = req.body;

    if (!productName || !purchaseDate || !warrantyPeriod || !purchaseAddress) {
        return res.status(200).json({ EnterAllDetails: "Please fill all the fields" });
    }

    if (warrantyPeriod < purchaseDate) {
        return res.status(200).json({ WarrantyExpired: "Warranty period has expired" });
    }

    const now = new Date();

    if (warrantyPeriod < now) {
        return res.status(200).json({ WarrantyExpired: "Warranty period has expired" });
    }

    const data = new WarrantySchema({
        productName,
        purchaseDate,
        warrantyPeriod,
        purchaseAddress
    });
    data.save();
    res.json(data);
}