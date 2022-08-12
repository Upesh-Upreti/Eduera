const { Enquiry } = require("../../models");

const getEnquiries = async (req, res) => {

    const enquiry = await Enquiry.findAll()

    if (enquiry) return res.status(200).json(enquiry)

    return res
        .status(404)
        .json({ message: "Sorry! we didn't find any enquiries ." })

}

const getEnquiriesById = async (req, res) => {

    const enquiryId = req.params.id

    const enquiry = await Enquiry.findOne({ where: { id: enquiryId } })

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
    getEnquiries,
    getEnquiriesById,
    deleteEnquiryById,
};
