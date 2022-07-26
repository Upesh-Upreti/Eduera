const express = require("express")

const router = express.Router()

const adminController = require("../../controllers/blogs/adminBlog")

//To get all the available blogs .
router.get("/blogs", adminController.getAllBlogs)

//To get a particular blogs  by its id.
router.get("/blog/:id", adminController.getBlogById)

//To add a new blog.
router.post("/add-blog", adminController.postAddBlog)

//To edit the existing blog 
router.patch("/edit-blog/:id", adminController.editBlogById)

//To delete a particular blog 
router.delete("/delete-blog/:id", adminController.deleteBlogById)

module.exports = router

