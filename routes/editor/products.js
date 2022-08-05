const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/editor/products");
const withLoggedIn = require("../../middlewares/withLoggedIn");

//? middleware
router.use(withLoggedIn);

//To add a new product.
router.post("/add", productsController.postAddProduct);

//To edit the existing product
router.patch("/edit/:id", productsController.editProductById);

//To delete a particular product
router.delete("/delete/:id", productsController.deleteProductById);

module.exports = router;
