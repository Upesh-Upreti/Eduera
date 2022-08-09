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

const getEnquiries = async (req, res) => {

    const enquiry = await Enquiry.findAll()

    if (enquiry) return res.status(200).json(enquiry)

    return res
        .status(404)
        .json({ message: "Sorry! we didn't find any enquiries ." })

}

const deleteEnquiryById = async (req, res) => {

    const enquiryId = req.params.id;

    const enquiry = await Enquiry.findOne({ where: { id: enquiryId } });

    if (!enquiry)
        return res.status(404).json({ "message": "Sorry! no such enquiry found." })


    const deleted = await Enquiry.destroy({ where: { id: enquiryId } });

    if (deleted) {
        res.status(202).json({ message: "Enquiry was deleted successfully." });
    } else {
        res.status(404).json({
            message:
                "No such enquiry was found or the enquiry was already deleted",
        });
    }
};

module.exports = {
    postAddEnquiry,
    getEnquiries,
    deleteEnquiryById,
};
