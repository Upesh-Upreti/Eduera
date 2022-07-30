const express = require("express")
const { checkToken } = require("../../auth/tokenValidation")

const router = express.Router()

const userController = require("../../controllers/testimonies/userTestimonies")

//To get all the available testimonies .
router.get("/testimonies", checkToken, userController.getAllTestimonies)

//To add a new testimony.
router.post("/add-testimony", checkToken, userController.postAddTestimony)

//To edit the existing testimony 
router.patch("/edit-testimony/:id", checkToken, userController.editTestimonyById)

//To delete a particular testimony 
router.delete("/delete-testimony/:id", checkToken, userController.deleteTestimonyById)

module.exports = router

