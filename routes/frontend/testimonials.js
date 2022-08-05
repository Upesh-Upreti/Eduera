const express = require("express");

const router = express.Router();

const testimonialsController = require("../../controllers/frontend/testimonials");

//To get all the available testimonies .
router.get("/", testimonialsController.getAllTestimonies);

module.exports = router;
