const express = require("express")

const router = express.Router()

const frontendController = require("../../controllers/blogs/frontendBlog")

//To get all the available blog.
router.get("/blogs", frontendController.getAllBlogs)

//To get a particular blog by its id.
router.get("/blog/:id", frontendController.getBlogById)

module.exports = router