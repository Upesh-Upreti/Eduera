const express = require("express");

const router = express.Router();

const careersController = require("../../controllers/frontend/careers");

//To get all the available careers .
router.get("/", careersController.getAllCareers);

//To get a particular career by its id.
router.get("/:id", careersController.getCareerById);

module.exports = router;
