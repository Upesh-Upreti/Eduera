const { Enquiry } = require("../../models");
const fs = require("fs")

const getAllEnquiries = async (req, res) => {
  const enquiry = await Enquiry.findAll();

  if (enquiry) return res.status(200).json(enquiry);

  return res
    .status(404)
    .json({ message: "Sorry! we didn't find any enquiry ." });
};

const getEnquiryById = async (req, res) => {
  const enquiryId = req.params.id
  const enquiry = await Enquiry.findOne({ where: { id: enquiryId } });

  if (enquiry) return res.status(200).json(enquiry);

  return res
    .status(404)
    .json({ message: "Sorry! we didn't find any enquiry ." });
};

const deleteEnquiryById = async (req, res) => {
  const enquiryId = req.params.id;

  const enquiry = await Enquiry.findOne({ where: { id: enquiryId } })

  if (!enquiry)
    return res.status(404).json({ "message": "No such enquiry found." })

  const path = "public/" + enquiry.imageUrl

  //to delete the previously existing image, if exists
  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) { console.log("Deletion error" + err); }

  const deleted = await Enquiry.destroy({ where: { id: enquiryId } });

  if (deleted) {
    res.status(202).json({ message: "Enquiry  was deleted successfully." });
  } else {
    res.status(404).json({
      message:
        "No such enquiry us was found or the Enquiry us was already deleted",
    });
  }

};

module.exports = {
  getAllEnquiries,
  getEnquiryById,
  deleteEnquiryById,
};
