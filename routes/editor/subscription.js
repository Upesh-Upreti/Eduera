const express = require("express");
const router = express.Router();
const subscriptionController = require("../../controllers/editor/subscription");
const withLoggedIn = require("../../middlewares/withLoggedIn");

// middleware
router.use(withLoggedIn);

//To get all subscription.
router.get("/:id", subscriptionController.getSubscriptionById);

//To get all subscription.
router.get("/", subscriptionController.getSubscriptions);

//To delete a particular subscription
router.delete("/delete/:id", subscriptionController.deleteSubscriptionById);

module.exports = router;
