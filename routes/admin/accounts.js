const express = require("express");
const router = express.Router();
const withAdmin = require("../../middlewares/withAdmin");
const withLoggedIn = require("../../middlewares/withLoggedIn");

const accountController = require("../../controllers/admin/account");

//? middleware
router.use(withLoggedIn, withAdmin);

//To get all the available accounts .
router.get("/", accountController.getAllAccounts);

//To get a particular accounts  by its id.
router.get("/:id", accountController.getAccountById);

//To add a new account.
router.post("/add", accountController.postAddAccount);

//To edit the existing account by the admin
router.patch("/edit/:id", accountController.editAccountById);

//To delete a particular account by admin
router.delete("/delete/:id", accountController.deleteAccountById);

//To reset password of other users by admin
router.patch("/reset-password/:id", accountController.resetPassword);

module.exports = router;
