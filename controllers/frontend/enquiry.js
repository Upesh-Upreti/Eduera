const { Enquiry } = require("../../models");
const crypto = require("crypto")

const postAddEnquiry = async (req, res) => {
  //Grabbing data from the form
  const { fullName, email, contactNumber, message } = req.body;

  //to avoid the error
  if (
    fullName === undefined ||
    email === undefined ||
    contactNumber === undefined ||
    message === undefined
  )
    return res.status(401).json({
      message:
        "Please atleast provide the fullname, email, contactNumber and message.",
    });


  const enquiry = await Enquiry.create({
    id: crypto.randomBytes(16).toString("hex"),
    fullName: fullName,
    email: email,
    imageUrl: req.file ? "images/" + req.file.filename : null,
    contactNumber: contactNumber,
    message: message,
  });

  if (enquiry) {
    res.status(202).json({ message: "Enquiry message was sent successfully." });
  } else {
    res.status(500).json({ message: "Sorry! Enquiry message isn't added" });
  }
};

module.exports = {
  postAddEnquiry,
};
