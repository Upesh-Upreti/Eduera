const express = require("express");
const router = express.Router();

const careersController = require("../../controllers/admin/careers");

//To add a new career.
router.post("/add", careersController.postAddCareer);

//To edit the existing career
router.patch("/edit/:id", careersController.editCareerById);

//To delete a particular career
router.delete("/delete/:id", careersController.deleteCareerById);

module.exports = router;
