const express = require("express");
const router = express.Router();
const withLoggedIn = require("../../middlewares/withLoggedIn");
const accountController = require("../../controllers/editor/account");

//? middleware
router.use(withLoggedIn);

//To change own password by the user
router.patch("/change-password", accountController.changePassword);

//To change own account details by user
router.patch("/edit-account", accountController.editAccountDetails);

//To get own account details by user
router.get("/account-info", accountController.accountDetails);

module.exports = router;
