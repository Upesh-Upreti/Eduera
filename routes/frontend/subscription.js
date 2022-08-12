const express = require("express");
const router = express.Router();
const subscriptionController = require("../../controllers/frontend/subscription");

//To add a new subscription.
router.post("/add", subscriptionController.postAddSubscription);

module.exports = router;