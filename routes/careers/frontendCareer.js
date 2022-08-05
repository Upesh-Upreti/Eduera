const express = require("express")

const router = express.Router()

const frontendController = require("../../controllers/careers/frontendCareer")

//To get all the available careers .
router.get("/careers", frontendController.getAllCareers)

//To get a particular career by its id.
router.get("/career/:id", frontendController.getCareerById)

module.exports = router

