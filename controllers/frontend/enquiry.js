const { Enquiry } = require("../../models");
const crypto = require("crypto");

const postAddEnquiry = async (req, res) => {
    //Grabbing data from the form
    const {
        name,
        email,
        phoneNumber,
        amount,
        paymentToken,
        product,
        message
    } = req.body;

    //to avoid the error
    if (name === undefined || phoneNumber === undefined)
        return res.status(400).json({
            message: "Please atleast provide the name and phone number.",
        });

    const enquiry = await Enquiry.create({
        id: crypto.randomBytes(16).toString("hex"),
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        amount: amount,
        paymentToken: paymentToken,
        product: product,
        message: message,
    });

    if (enquiry) {
        res.status(200).json({ message: "Enquiry was added successfully." });
    } else {
        res.status(500).json({ message: "Sorry! enquiry isn't added" });
    }
};

module.exports = {
    postAddEnquiry
}