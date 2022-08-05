const express = require("express");

const router = express.Router();

const productsController = require("../../controllers/frontend/products");

//To get all the available priducts.
router.get("/", productsController.getAllProducts);

//To get a particular product by its id.
router.get("/:id", productsController.getProductById);

module.exports = router;
