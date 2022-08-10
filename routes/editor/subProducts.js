const express = require("express");
const router = express.Router();
const productsController = require("../../controllers/editor/subProducts");
const withLoggedIn = require("../../middlewares/withLoggedIn");

//? middleware
router.use(withLoggedIn);

//To add a new subproduct.
router.post("/add/:id", productsController.postAddSubProduct);

//To edit the existing subproduct
router.patch("/edit/:id", productsController.editSubProductById);

//To delete a particular subproduct
router.delete("/delete/:id", productsController.deleteSubProductById);

module.exports = router;
