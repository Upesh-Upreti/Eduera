const express = require("express")
const { checkToken } = require("../../auth/tokenValidation")

const router = express.Router()

const userController = require("../../controllers/careers/userCareer")

//To get all the available careers .
router.get("/careers", checkToken, userController.getAllCareers)

//To get a particular career by its id.
router.get("/career/:id", checkToken, userController.getCareerById)

//To add a new career.
router.post("/add-career", checkToken, userController.postAddCareer)

//To edit the existing career 
router.patch("/edit-career/:id", checkToken, userController.editCareerById)

//To delete a particular career 
router.delete("/delete-career/:id", checkToken, userController.deleteCareerById)

module.exports = router

