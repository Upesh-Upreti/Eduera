const express = require("express");

const router = express.Router();

const frontendController = require("../../controllers/frontend/blogs");

//To get all the available blog.
router.get("/", frontendController.getAllBlogs);

//To get a particular blog by its id.
router.get("/:id", frontendController.getBlogById);

module.exports = router;
