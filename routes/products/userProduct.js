const express = require("express")

const router = express.Router()

const userController = require("../../controllers/products/userProduct")

//To get all the available priducts.
router.get("/products", userController.getAllProducts)

//To get a particular product by its id.
router.get("/product/:id", userController.getProductById)

module.exports = router