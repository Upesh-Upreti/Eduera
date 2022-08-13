const express = require("express");
const router = express.Router();
const enquiryController = require("../../controllers/editor/enquiry");
const withLoggedIn = require("../../middlewares/withLoggedIn");

//? middleware
router.use(withLoggedIn);

// get all enquirys
router.get("/", enquiryController.getAllEnquiries);

//To get a particular career by its id.
router.get("/:id", enquiryController.getEnquiryById);

//To delete a particular career
router.delete("/delete/:id", enquiryController.deleteEnquiryById);

module.exports = router;
