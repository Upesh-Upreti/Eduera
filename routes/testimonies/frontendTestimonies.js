const express = require("express")

const router = express.Router()

const frontendController = require("../../controllers/testimonies/frontendTestimonies")

//To get all the available testimonies .
router.get("/testimonies", frontendController.getAllTestimonies)

module.exports = router

