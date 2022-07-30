const express = require("express")
const { checkToken } = require("../../auth/tokenValidation")

const router = express.Router()

const userController = require("../../controllers/products/userProduct")

//To get all the available priducts.
router.get("/products", checkToken, userController.getAllProducts)

//To get a particular product by its id.
router.get("/product/:id", checkToken, userController.getProductById)

//To add a new product.
router.post("/add-product", checkToken, userController.postAddProduct)

//To edit the existing product
router.patch("/edit-product/:id", checkToken, userController.editProductById)

//To delete a particular product
router.delete("/delete-product/:id", checkToken, userController.deleteProductById)

module.exports = router

