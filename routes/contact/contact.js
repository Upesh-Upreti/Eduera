const express = require("express")
const { checkToken } = require("../../auth/tokenValidation")
const { isAdmin } = require("../../auth/adminValidation")

const router = express.Router()

const userContact = require("../../controllers/contact/contact")

//To add the new contact us 
router.post("/contact", userContact.postAddContact)

//To get all the available careers .
router.get("/contacts", checkToken, userContact.getAllContacts)

//To get a particular career by its id.
router.get("/contact/:id", checkToken, userContact.getContactById)

//To delete a particular career 
router.delete("/delete-contact/:id", checkToken, isAdmin, userContact.deleteContactById)

module.exports = router

