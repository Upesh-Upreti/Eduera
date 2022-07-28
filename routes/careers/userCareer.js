const express = require("express")

const router = express.Router()

const userController = require("../../controllers/careers/userCareer")

//To get all the available careers .
router.get("/careers", userController.getAllCareers)

//To get a particular career by its id.
router.get("/career/:id", userController.getCareerById)

module.exports = router

