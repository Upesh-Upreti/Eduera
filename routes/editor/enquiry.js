const express = require("express");
const router = express.Router();
const enquiryController = require("../../controllers/editor/enquiry");
const withLoggedIn = require("../../middlewares/withLoggedIn");

// middleware
router.use(withLoggedIn);

//To add a new enquiry.
router.post("/add", enquiryController.postAddEnquiry);

//To get all enquiry.
router.get("/", enquiryController.getEnquiries);

//To delete a particular enquiry
router.delete("/delete/:id", enquiryController.deleteEnquiryById);

module.exports = router;