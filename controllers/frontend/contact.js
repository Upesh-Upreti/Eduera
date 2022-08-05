const { Contact } = require("../../models");

const postAddContact = async (req, res) => {
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

  const contact = await Contact.create({
    fullName: fullName,
    email: email,
    contactNumber: contactNumber,
    message: message,
  });

  if (contact) {
    res.status(202).json({ message: "Contact message was sent successfully." });
  } else {
    res.status(500).json({ message: "Sorry! Contact message isn't added" });
  }
};

module.exports = {
  postAddContact,
};
