const { Subscription } = require("../../models");
const crypto = require("crypto");

const postAddSubscription = async (req, res) => {
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
    if (name === undefined || phoneNumber === undefined || req.file === null)
        return res.status(400).json({
            message: "Please atleast provide the name, payment image and phone number.",
        });

    const subscription = await Subscription.create({
        id: crypto.randomBytes(16).toString("hex"),
        name: name,
        phoneNumber: phoneNumber,
        email: email,
        imageUrl: "public/images/" + req.file.filename,
        amount: amount,
        paymentToken: paymentToken,
        product: product,
        message: message,
    });

    if (subscription) {
        res.status(200).json({ message: "Subscription was added successfully." });
    } else {
        res.status(500).json({ message: "Sorry! subscription isn't added" });
    }
};

module.exports = {
    postAddSubscription
}