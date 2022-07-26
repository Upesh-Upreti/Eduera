const express = require("express")

const router = express.Router()

const adminController = require("../../controllers/products/adminProduct")

//To get all the available priducts.
router.get("/products", adminController.getAllProducts)

//To get a particular product by its id.
router.get("/product/:id", adminController.getProductById)

//To add a new product.
router.post("/add-product", adminController.postAddProduct)

//To edit the existing product
router.patch("/edit-product/:id", adminController.editProductById)

//To delete a particular product
router.delete("/delete-product/:id", adminController.deleteProductById)

module.exports = router

