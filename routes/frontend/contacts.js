const express = require("express");

const router = express.Router();

const contactController = require("../../controllers/frontend/contact");

//To add the new contact us
router.post("/", contactController.postAddContact);

module.exports = router;
