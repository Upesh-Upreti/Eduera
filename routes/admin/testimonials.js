const express = require("express");
const router = express.Router();

const testimonialsController = require("../../controllers/admin/testimonials");

//To add a new testimony.
router.post("/add", testimonialsController.postAddTestimony);

//To edit the existing testimony
router.patch("/edit/:id", testimonialsController.editTestimonyById);

//To delete a particular testimony
router.delete("/delete/:id", testimonialsController.deleteTestimonyById);

module.exports = router;
