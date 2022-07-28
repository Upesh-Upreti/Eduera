const express = require("express")

const router = express.Router()

const adminController = require("../../controllers/careers/adminCareer")

//To get all the available careers .
router.get("/careers", adminController.getAllCareers)

//To get a particular career by its id.
router.get("/career/:id", adminController.getCareerById)

//To add a new career.
router.post("/add-career", adminController.postAddCareer)

//To edit the existing career 
router.patch("/edit-career/:id", adminController.editCareerById)

//To delete a particular career 
router.delete("/delete-career/:id", adminController.deleteCareerById)

module.exports = router

