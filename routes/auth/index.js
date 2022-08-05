const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth");

//To log in to the account.
router.post("/login", authController.postLogin);

//To log out of the account.
router.delete("/logout", authController.deleteLogout);

module.exports = router;
