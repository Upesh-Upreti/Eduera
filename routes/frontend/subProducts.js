const express = require("express");

const router = express.Router();

const subProductsController = require("../../controllers/frontend/subProducts");

//To get all the available priducts.
router.get("/:id", subProductsController.getAllSubProducts);

//To get a particular product by its id.
router.get("/:pid/:id", subProductsController.getSubProductById);

module.exports = router;
