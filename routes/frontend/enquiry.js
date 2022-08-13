const express = require("express");

const router = express.Router();

const enquiryController = require("../../controllers/frontend/enquiry");

//To add the new enquiry us
router.post("/", enquiryController.postAddEnquiry);

module.exports = router;
