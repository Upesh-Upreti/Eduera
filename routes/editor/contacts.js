const express = require("express");
const router = express.Router();
const contactController = require("../../controllers/editor/contact");
const withLoggedIn = require("../../middlewares/withLoggedIn");

//? middleware
router.use(withLoggedIn);

// get all contacts
router.get("/", contactController.getAllContacts);

//To get a particular career by its id.
router.get("/:id", contactController.getContactById);

//To delete a particular career
router.delete("/delete/:id", contactController.deleteContactById);

module.exports = router;
