const express = require("express");
const { checkToken } = require("../../auth/tokenValidation");

const router = express.Router();

const accountController = require("../../controllers/user/account");

router.use("/", checkToken);

//To change own password by the user
router.patch("/change-password", accountController.changePassword);

//To change own account details by user
router.patch("/edit-account", accountController.changePassword);

module.exports = router;
