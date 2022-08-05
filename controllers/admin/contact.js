const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const contact = await Contact.findAll();

  if (contact) return res.status(200).json(contact);

  return res
    .status(404)
    .json({ message: "Sorry! we didn't find any contact us ." });
};

const getContactById = async (req, res) => {
  const contact = await Contact.findAll();

  if (contact) return res.status(200).json(contact);

  return res
    .status(404)
    .json({ message: "Sorry! we didn't find any contact ." });
};

const deleteContactById = async (req, res) => {
  const contactId = req.params.id;

  const deleted = await Contact.destroy({ where: { id: contactId } });

  if (deleted) {
    res.status(202).json({ message: "Contact  was deleted successfully." });
  } else {
    res.status(404).json({
      message:
        "No such contact us was found or the Contact us was already deleted",
    });
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  deleteContactById,
};
