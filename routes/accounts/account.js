const express = require("express")

const router = express.Router()

const accountController = require("../../controllers/accounts/account")
const { checkToken } = require("../../auth/tokenValidation")
const { isAdmin } = require("../../auth/adminValidation")

//To get all the available accounts .
router.get("/accounts", checkToken, isAdmin, accountController.getAllAccounts)

//To get a particular accounts  by its id.
router.get("/account/:id", checkToken, isAdmin, accountController.getAccountById)

//To log in to the account.
router.post("/login", accountController.postLogin)

//To log out of the account.
router.delete("/logout", accountController.deleteLogout)

//To add a new account.
router.post("/add-account", checkToken, isAdmin, accountController.postAddAccount)

//To edit the existing account by the admin
router.patch("/edit-account/:id", checkToken, isAdmin, accountController.editAccountById)

//To delete a particular account by admin
router.delete("/delete-account/:id", checkToken, isAdmin, accountController.deleteAccountById)

//To change own password by the user 
router.patch("/change-password", checkToken, accountController.changePassword)

//To change own account details by user
router.patch("/edit-account", checkToken, accountController.changePassword)

//To reset password of other users by admin
router.patch("/reset-password/:id", checkToken, isAdmin, accountController.resetPassword)

module.exports = router

