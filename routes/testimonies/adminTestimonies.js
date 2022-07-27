const express = require("express")

const router = express.Router()

const adminController = require("../../controllers/testimonies/adminTestimonies")

//To get all the available testimonies .
router.get("/testimonies", adminController.getAllTestimonies)

//To add a new testimony.
router.post("/add-testimony", adminController.postAddTestimony)

//To edit the existing testimony 
router.patch("/edit-testimony/:id", adminController.editTestimonyById)

//To delete a particular testimony 
router.delete("/delete-testimony/:id", adminController.deleteTestimonyById)

module.exports = router

