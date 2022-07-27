const express = require("express")

const router = express.Router()

const userController = require("../../controllers/testimonies/userTestimonies")

//To get all the available testimonies .
router.get("/testimonies", userController.getAllTestimonies)

module.exports = router

