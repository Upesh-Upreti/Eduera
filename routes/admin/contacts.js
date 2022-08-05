const express = require("express");
const router = express.Router();

const userContact = require("../../controllers/admin/contact");

//To get a particular career by its id.
router.get("/:id", userContact.getContactById);

//To delete a particular career
router.delete("/delete/:id", userContact.deleteContactById);

module.exports = router;
