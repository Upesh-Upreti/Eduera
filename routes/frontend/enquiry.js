const express = require("express");
const router = express.Router();
const enquiryController = require("../../controllers/frontend/enquiry");

//To add a new enquiry.
router.post("/add", enquiryController.postAddEnquiry);

module.exports = router;