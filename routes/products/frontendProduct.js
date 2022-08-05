const express = require("express")

const router = express.Router()

const frontendController = require("../../controllers/products/frontendProduct")

//To get all the available priducts.
router.get("/products", frontendController.getAllProducts)

//To get a particular product by its id.
router.get("/product/:id", frontendController.getProductById)

module.exports = router