const express = require("express")

const router = express.Router()

const userController = require("../../controllers/blogs/userBlog")

//To get all the available blog.
router.get("/blogs", userController.getAllBlogs)

//To get a particular blog by its id.
router.get("/blog/:id", userController.getBlogById)

module.exports = router